import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UsersForTest from "@/features/users/pages/UsersForTest";

describe("User", () => {
    test("renders heading", async () => {
        render(<UsersForTest />);
        expect(screen.getByRole("heading", { name: "UsersForTest" })).toBeInTheDocument();
    });

    test("renders a list of users", async () => {
        render(<UsersForTest />);
        const users = await screen.findAllByRole("listitem");
        expect(users).toHaveLength(2);
    });
});
