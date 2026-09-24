function showMessage(message, type = "error") {

    const element = document.getElementById("message");

    if (!element) return;

    element.textContent = message;

    element.className = `alert ${type}`;
}


// REGISTRO

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const passwordConfirm =
            document.getElementById("passwordConfirm").value;


        if (password !== passwordConfirm) {

            showMessage(
                "As senhas não coincidem."
            );

            return;
        }


        if (password.length < 6) {

            showMessage(
                "A senha deve ter pelo menos 6 caracteres."
            );

            return;
        }


        const button =
            registerForm.querySelector("button");

        button.disabled = true;

        button.textContent = "Criando conta...";


        try {

            const { data, error } =
                await supabaseClient.auth.signUp({

                    email: email,

                    password: password,

                    options: {

                        emailRedirectTo:
                            window.location.origin +
                            "/Key_store/login.html"

                    }

                });


            if (error) {

                showMessage(error.message);

                return;
            }


            showMessage(
                "Conta criada. Verifique seu e-mail para confirmar a conta.",
                "success"
            );


            registerForm.reset();

        } catch (error) {

            showMessage(
                "Ocorreu um erro. Tente novamente."
            );

        } finally {

            button.disabled = false;

            button.textContent = "Criar conta";

        }

    });

}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        const button =
            loginForm.querySelector("button");

        button.disabled = true;

        button.textContent = "Entrando...";


        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({

                    email: email,

                    password: password

                });


            if (error) {

                showMessage(error.message);

                return;
            }


            window.location.href =
                "account.html";

        } catch (error) {

            showMessage(
                "Não foi possível entrar."
            );

        } finally {

            button.disabled = false;

            button.textContent = "Entrar";

        }

    });

}


// PROTEGER CONTA

async function protectAccount() {

    const { data, error } =
        await supabaseClient.auth.getUser();


    if (error || !data.user) {

        window.location.href = "login.html";

        return;
    }


    const emailElement =
        document.getElementById("userEmail");


    if (emailElement) {

        emailElement.textContent =
            data.user.email;

    }

}


if (window.location.pathname.endsWith("account.html")) {

    protectAccount();

}


// LOGOUT

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        await supabaseClient.auth.signOut();

        window.location.href = "index.html";

    });

          }
