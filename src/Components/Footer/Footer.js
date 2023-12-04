const Footer = () => {
    renderFooter();
}

function renderFooter(){
    const footer = document.querySelector('footer');

    footer.innerHTML = 
    ` <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2023 Copyright:
    <p> Lucas Gregoire / Rafael Millor / Yohani Mwananteba / Ali Elhannouti / Nathanael Afangbedjee </p>
  </div>`
}

export default Footer;