import { describe,it,expect } from "vitest";
import { render,screen } from "@testing-library/react";
import Brand from "../components/Brand";
describe("Brand",()=>{it("renders the MAILORA identity",()=>{render(<Brand/>);expect(screen.getByText("MAILORA")).toBeInTheDocument();});});
