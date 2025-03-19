import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "@/shared/components/FormElements/Button";

describe("Button component", () => {
    it("renders default style", async () => {
        render(<Button>DEFAULT BUTTON</Button>);
        const buttonElement = screen.getByRole("button", { name: "DEFAULT BUTTON" });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('button button--default undefined undefined');
    });

    it("renders inverses style", async () => {
        render(<Button inverse>INVERSE BUTTON</Button>);
        const buttonElement = screen.getByRole("button", { name: "INVERSE BUTTON" });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('button button--default button--inverse undefined');
    });

    it("renders danger style", async () => {
        render(<Button danger>DANGER BUTTON</Button>);
        const buttonElement = screen.getByRole("button", { name: "DANGER BUTTON" });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('button button--default undefined button--danger');
    });

    it("handles onClick event", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>BUTTON</Button>);
        const buttonElement = screen.getByRole("button", { name: "BUTTON" });
        await user.click(buttonElement);
        expect(handleClick).toHaveBeenCalled();
    })
});