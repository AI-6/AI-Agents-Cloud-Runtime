
## FilesystemManager interface

Manager for interacting with the filesystem in the sandbox.

**Signature:**

```typescript
interface FilesystemManager 
```

## Methods

|  Method | Description |
|  --- | --- |
|  [list(path, opts)](./sdk.filesystemmanager.list.md) | List files in a directory. |
|  [makeDir(path, opts)](./sdk.filesystemmanager.makedir.md) | Creates a new directory and all directories along the way if needed on the specified pth. |
|  [read(path, opts)](./sdk.filesystemmanager.read.md) | Reads the whole content of a file. |
|  [readBytes(path)](./sdk.filesystemmanager.readbytes.md) | Reads the whole content of a file as an array of bytes. |
|  [remove(path, opts)](./sdk.filesystemmanager.remove.md) | Removes a file or a directory. |
|  [watchDir(path)](./sdk.filesystemmanager.watchdir.md) | Watches directory for filesystem events. |
|  [write(path, content, opts)](./sdk.filesystemmanager.write.md) | Writes content to a new file on path. |
|  [writeBytes(path, content)](./sdk.filesystemmanager.writebytes.md) | <p>Write array of bytes to a file. This can be used when you cannot represent the data as an UTF-8 string.</p><p>A new file will be created if it doesn't exist. If the file already exists, it will be overwritten.</p> |
