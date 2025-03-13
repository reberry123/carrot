"use server";

export async function handleForm(prevState: any, formData: FormData) {
    const pw = formData.get("password");

    if (pw == "12345") {
        return {
            login: true,
        };
    }

    return {
        errors: ["Wrong password"],
    }
}