
## ProcessOutput class

Output from a process.

**Signature:**

```typescript
declare class ProcessOutput 
```

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [error](./sdk.processoutput.error.md) | <code>readonly</code> | boolean | Whether the process has errored. |
|  [exitCode](./sdk.processoutput.exitcode.md) | <code>readonly</code> | number \| undefined | The exit code of the process. |
|  [stderr](./sdk.processoutput.stderr.md) | <code>readonly</code> | string | The stderr from the process. |
|  [stdout](./sdk.processoutput.stdout.md) | <code>readonly</code> | string | The stdout from the process. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addStderr(message)](./sdk.processoutput.addstderr.md) |  |  |
|  [addStdout(message)](./sdk.processoutput.addstdout.md) |  |  |
|  [setExitCode(exitCode)](./sdk.processoutput.setexitcode.md) |  |  |
