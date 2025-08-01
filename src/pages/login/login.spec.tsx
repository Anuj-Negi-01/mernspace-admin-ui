import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import LoginPage from "./login";

describe("Login page", () => {
  it("should render with required fields", () => {
    render(  
        < LoginPage /> 
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument(); 
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument(); 
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login"})).toBeInTheDocument()
    expect(screen.getByRole("checkbox", { name: "Remember me"})).toBeInTheDocument()
    expect(screen.getByText('Forgot password')).toBeInTheDocument()
  });
});
