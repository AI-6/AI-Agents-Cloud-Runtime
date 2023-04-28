/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/generate": {
    /** Generate */
    post: operations["generate_generate_post"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** GenerateBody */
    GenerateBody: {
      model_config: components["schemas"]["ModelConfig"];
      /** Project Id */
      project_id: string;
    };
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: (components["schemas"]["ValidationError"])[];
    };
    /** ModelConfig */
    ModelConfig: {
      /** Args */
      args: Record<string, never>;
      /** Prompt */
      prompt: (components["schemas"]["PromptPart"])[];
      /** Provider */
      provider: string;
    };
    /** PromptPart */
    PromptPart: {
      /** Content */
      content: string;
      /**
       * Role 
       * @enum {string}
       */
      role: "user" | "system";
      /** Type */
      type: string;
    };
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /** Generate */
  generate_generate_post: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["GenerateBody"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": Record<string, never>;
        };
      };
      /** @description Validation Error */
      422: {
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}