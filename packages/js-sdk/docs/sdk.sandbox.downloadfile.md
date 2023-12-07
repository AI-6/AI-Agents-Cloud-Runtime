
## Sandbox.downloadFile() method

Downloads a file from the sandbox.

**Signature:**

```typescript
downloadFile(remotePath: string, format?: DownloadFileFormat): Promise<string | Blob | ArrayBuffer>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  remotePath | string | Path to a file on the sandbox |
|  format | [DownloadFileFormat](./sdk.downloadfileformat.md) | _(Optional)_ Format of the downloaded file |

**Returns:**

Promise&lt;string \| Blob \| ArrayBuffer&gt;

File content

## Example


```ts
const sandbox = await Sandbox.create()
const content = await sandbox.downloadFile('/home/user/file.txt')
```
