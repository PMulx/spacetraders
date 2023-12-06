import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useParams,
  useNavigate,
} from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contacts } = useLoaderData();
  const contactId = parseInt(useParams().contactId, 10);
  const contact = contacts.find((c) => c.id === contactId);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData);

    try {
      await updateContact(contactId, updatedData);
      console.log("Données mises à jour :", updatedData);
      navigate(`/contacts/${contactId}`); // Rediriger vers la page de l'utilisateur
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    }
  };

  return (
    <Form method="post" id="contact-form" onSubmit={handleSubmit}>
      <label class="label__edit">
        <p>Prénom</p>
        <input
          type="text"
          name="first_name"
          defaultValue={contact.first_name}
        />
      </label>
      <label>
        <p>Nom</p>
        <input type="text" name="last_name" defaultValue={contact.last_name} />
      </label>
      <label>
        <p>Email</p>
        <input type="text" name="email" defaultValue={contact.email} />
      </label>
      <button class="button__confirm" type="submit">
        Confirmer
      </button>
      <button
        class="button__error"
        type="button"
        onClick={() => navigate(`/contacts/${contactId}`)}
      >
        Annuler
      </button>
    </Form>
  );
}
