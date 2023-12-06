const AddContactForm = require("./form");

test("form controls are validated and button is disabled by default", () => {
  const form = new AddContactForm();
  console.log(form);
  const firstNameInput = screen.getByLabelText("Prénom");
  const lastNameInput = screen.getByLabelText("Nom");
  const emailInput = screen.getByLabelText("Email");
  const avatarInput = screen.getByLabelText("Avatar URL");
  const addButton = screen.getByText("Ajouter l'utilisateur");

  expect(addButton).toBeDisabled();

  fireEvent.change(firstNameInput, { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "" } });
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });
  fireEvent.change(avatarInput, { target: { value: "invalid-url" } });

  expect(addButton).toBeDisabled();

  fireEvent.change(lastNameInput, { target: { value: "Doe" } });

  expect(addButton).not.toBeDisabled();
});
