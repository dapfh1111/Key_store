function showPlans(product) {

    const plans =
        document.getElementById("plans");

    const title =
        document.getElementById("selectedProduct");


    if (!plans || !title) return;


    title.textContent = product;

    plans.style.display = "block";


    plans.scrollIntoView({
        behavior: "smooth"
    });

}


async function loginRequired() {

    try {

        const { data } =
            await supabaseClient.auth.getUser();


        if (!data.user) {

            window.location.href = "login.html";

            return;
        }


        alert(
            "Checkout será implementado na próxima versão."
        );

    } catch (error) {

        window.location.href = "login.html";

    }

}
