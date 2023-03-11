import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { SupabaseClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'
import { projects, Prisma } from '@prisma/client'

import { Database } from 'db/supabase'
import { projectsTable } from 'db/tables'

export interface Block {
  id: string
  prompt: string
}

export interface Route {
  blocks: Block[]
  method: Method
  route: string
  id: string
}

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export const methods = Object
  .keys(Method)
  .filter((item) => isNaN(Number(item)))
  .map(v => v.toLowerCase())

export interface SerializedState {
  routes: Route[]
}

export interface State extends SerializedState {
  changeBlock: (routeID: string, index: number, block: Partial<Omit<Block, 'id'>>) => void
  deleteBlock: (routeID: string, index: number) => void
  addBlock: (routeID: string) => void
  changeRoute: (id: string, route: Partial<Omit<Route, 'id'>>) => void
  deleteRoute: (id: string) => void
  addRoute: () => void
}

function getDefaultBlock(): Block {
  return {
    prompt: '',
    id: nanoid(),
  }
}

function getDefaultRoute(): Route {
  return {
    blocks: [getDefaultBlock()],
    method: Method.POST,
    route: '/',
    id: nanoid(),
  }
}

function getDefaultState(): SerializedState {
  return {
    routes: [getDefaultRoute()],
  }
}

export function getTypedState(data?: Prisma.JsonValue): SerializedState | undefined {
  if (!data) return
  if ('state' in (data as any)) {
    return (data as any)['state'] as SerializedState
  }
}

export function createStore(project: projects, client?: SupabaseClient<Database>) {
  const initialState = getTypedState(project.data) || getDefaultState()

  if (initialState.routes.length === 0) {
    initialState.routes.push(getDefaultRoute())
  }

  const immerStore = immer<State>((set) => ({
    ...initialState,
    addRoute: () => set(state => {
      state.routes.push(getDefaultRoute())
    }),
    deleteRoute: (id) => set(state => {
      const idx = state.routes.findIndex(r => r.id === id)
      state.routes.splice(idx, 1)
    }),
    changeRoute: (id, route) => set(state => {
      const idx = state.routes.findIndex(r => r.id === id)
      if (idx !== -1) {
        state.routes[idx] = {
          ...state.routes[idx],
          ...route,
        }
      }
    }),
    changeBlock: (routeID, index, block) => set(state => {
      const idx = state.routes.findIndex(r => r.id === routeID)
      if (idx !== -1) {
        state.routes[idx].blocks[index] = {
          ...state.routes[idx].blocks[index],
          ...block,
        }
      }
    }),
    deleteBlock: (routeID, index) => set(state => {
      const idx = state.routes.findIndex(r => r.id === routeID)
      if (idx !== -1) {
        state.routes[idx].blocks.splice(index, 1)
      }
    }),
    addBlock: (routeID) => set(state => {
      const idx = state.routes.findIndex(r => r.id === routeID)
      if (idx !== -1) {
        state.routes[idx].blocks.push(getDefaultBlock())
      }
    }),
  }))

  const persistent = persist(immerStore, {
    name: 'supabase-storage',
    partialize: (state) => state,
    storage: client ? {
      getItem: async (name) => {
        // We retrieve the data on the server
        return null
      },
      removeItem: async () => {
        const res = await client.from(projectsTable).update({ data: {} }).eq('id', project.id).single()
        if (res.error) {
          throw res.error
        }
      },
      setItem: async (name, value) => {
        const res = await client.from(projectsTable).update({ data: value as any }).eq('id', project.id)
        if (res.error) {
          throw res.error
        }
      },
    } : undefined,
  })

  const useStore = create<State, [['zustand/persist', unknown], ['zustand/immer', never]]>(persistent)
  return useStore
}