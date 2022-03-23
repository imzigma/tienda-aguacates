const baseUrl = "https://platzi-avo.vercel.app";
const mountNode = document.getElementById("js-mount");

const formatPrice = (price) =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

!(async function () {
  const response = await fetch(`${baseUrl}/api/avo`);

  const { data: allAvos } = await response.json();

  const nodeArray = allAvos.map((avocado) => {

    const image = document.createElement("img");
    image.className =
      "h-16 w-16 md:h-36 md:w-36 rounded-full mx-auto md:mx-0 md:mr-6 ";
    image.src = `${baseUrl}${avocado.image}`;

    const title = document.createElement("h2");
    title.className = "text-lg font-bold text-gray-700";
    title.textContent = avocado.name;

    const price = document.createElement("div");
    price.className = "text-gray-300 font-bold";
    price.textContent = formatPrice(avocado.price);

    const priceAndTitle = document.createElement("div");
    priceAndTitle.className = "text-center md:text-left";
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    const card = document.createElement("div");
    card.className = "md:flex p-6 items-center";
    card.appendChild(image);
    card.appendChild(priceAndTitle);

    return card;
  });

  mountNode.append(...nodeArray);
})();