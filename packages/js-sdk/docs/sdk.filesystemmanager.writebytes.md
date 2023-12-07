
## FilesystemManager.writeBytes() method

Write array of bytes to a file. This can be used when you cannot represent the data as an UTF-8 string.

A new file will be created if it doesn't exist. If the file already exists, it will be overwritten.

**Signature:**

```typescript
writeBytes(path: string, content: Uint8Array): Promise<void>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  path | string | path to a file |
|  content | Uint8Array | byte array representing the content to write |

**Returns:**

Promise&lt;void&gt;
