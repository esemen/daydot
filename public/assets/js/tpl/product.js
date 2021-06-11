window.PRODUCT_ROW = '<div class="flex flex-row shadow bg-white rounded-lg p-4 space-x-4">' +
    '    <div>' +
    '        <img class="w-16 max-w-xs" src="{image_url}">' +
    '    </div>' +
    '    <div class="flex-1">' +
    '        <h1 class="font-semibold text-lg">{name}</h1>' +
    '        <p class="mb-3">{tagline}</p>' +
    '        <small class="text-gray-500">{description}</small>' +
    '    </div>' +
    '    <div class="w-5">' +
    '        <button class="btnFav" id="btnFav_{id}" onClick="setFavourite({id}, {index})">' +
    '            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>\n' +
    '            </svg>' +
    '        </button>' +
    '    </div>' +
    '</div>'
