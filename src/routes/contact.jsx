import React, { useEffect } from "react";
import {
  useLoaderData,
  useNavigation,
  Form,
  useParams,
  redirect,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Contact() {
  const { contacts } = useLoaderData();
  const contactId = parseInt(useParams().contactId, 10);
  const contact = contacts.find((c) => c.id === contactId);

  return (
    <>
      <div>
        {contact ? (
          <div class="detail__contact">
            <div class="user__names">
              <p>
                {contact.first_name} {contact.last_name}
              </p>
            </div>
            <img
              class="user__image"
              src={contact.avatar}
              alt={`${contact.first_name} ${contact.last_name}`}
            />
            <div class="user__details">
              <p class="user__mail">{contact.email}</p>
              <div class="user__button">
                <Form
                  method="post"
                  action="destroy"
                  onSubmit={(event) => {
                    if (
                      !confirm(
                        "Merci de confirmer que vous voulez vraiment supprimer cette utilisateur"
                      )
                    ) {
                      event.preventDefault();
                    }
                  }}
                >
                  <button type="submit">Delete</button>
                </Form>
                <Form action="edit">
                  <button type="submit">Edit</button>
                </Form>
              </div>
            </div>
          </div>
        ) : (
          <p>
            <i>No contact found</i>
          </p>
        )}
      </div>
    </>
  );
}
