//Autor: ISAAC REYES
$(document).ready(function () {
    //animaciones
    anime({
        targets: '#userInfoForm',
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 2000,
        easing: 'easeOutExpo'
    });
    
    anime({
        targets: '#inputForm',
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: 500, // Starts 500ms 
        duration: 2000,
        easing: 'easeOutExpo'
    }); 


    //fondo:
    var images = ['img/investigacion.jpg','img/farmacos.webp', 'img/MachineLearning.jpg']; //HAY COMO METER MAS IMAGaNES
    var currentImageIndex = 0;

    function changeBackgroundImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        $('body').css('background-image', 'url(' + images[currentImageIndex] + ')');
    }

    setInterval(changeBackgroundImage, 5000); // Cambia la imagen cada 10 segundos


    // Handle hamburger menu click
    $(".hamburger-menu").click(function () {
        $(".menu").slideToggle();
    });

    //Information
    function validateInput(value) {
        if (!Number.isFinite(value)) {
            alert("Por favor, ingrese un número válido");
            return false;
        }

        if (value < 0) {
            alert("El valor debe ser mayor o igual a 0");
            return false;
        }

        return true;
    }

    //algoritmo Machine Leaning:
    function runAlgorithm(value1, value2) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (validateInput(value1) && validateInput(value2)) {
                    const result = value1 + value2;
                    resolve(result);
                } else {
                    reject(new Error("Entrada inválida"));
                }
            }, 2000);
        });
    }

    //Grafico resultado;
    function drawChart(data) {
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map((_, i) => i + 1),
                datasets: [{
                    label: 'Resultados',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            }
        });
    }

    //Esto puede cambiar y ser escalable:
    function linearRegression(value1, value2) {
        const results = [];
        for (let i = 0; i < 10; i++) {
            const result = value1 * i + value2;
            results.push(result);
        }
        return results;
    }

    //usuario, validacion y criterios de evaluacion:
    let userData = {};

    $("#userInfoForm").on("submit", function (event) {
        event.preventDefault();

        userData.name = $("#userName").val();
        userData.email = $("#userEmail").val();
        userData.phone = $("#userPhone").val();
        userData.address = $("#userAddress").val(); 
        
        if (!userData.name || !userData.email || !userData.phone || !userData.address) {
            alert("Por favor, rellene todos los campos de la información del usuario.");
            return;
        }

        alert("Información del usuario guardada.");
    });

    $("#inputForm").on("submit", function (event) {
        event.preventDefault();

        if (!userData.name || !userData.email) {
            alert("Por favor, rellene la información del usuario primero.");
            return;
        }

        const value1 = Number($("#value1").val());
        const value2 = Number($("#value2").val());

        if (validateInput(value1) && validateInput(value2)) {
            const results = linearRegression(value1, value2);
            $("#results").text("Resultados: " + results.join(", "));
            drawChart(results);

            // Simular el envío de un email con los resultados
            console.log(`Enviando los resultados a ${userData.email}`);
        } else {
            alert("Hubo un error al ejecutar el algoritmo.");
        }
    });
});




