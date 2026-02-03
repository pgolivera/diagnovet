import { describe, it, expect } from "vitest";
import environments from "./environments";

describe("environments", () => {
  it("should have PRODUCTION constant", () => {
    expect(environments.PRODUCTION).toBe("production");
  });

  it("should have DEVELOPMENT constant", () => {
    expect(environments.DEVELOPMENT).toBe("development");
  });
});
