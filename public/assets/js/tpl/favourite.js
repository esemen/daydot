window.BEER_ROW = '<div id="beer_{dbid}" class="flex flex-row shadow bg-white rounded-lg p-4 space-x-4">' +
    '    <div>' +
    '        <img class="w-16 max-w-xs" src="{image_url}">' +
    '    </div>' +
    '    <div class="flex-1">' +
    '        <h1 class="font-semibold text-lg">{name}</h1>' +
    '        <p class="mb-3">{tagline}</p>' +
    '        <small class="text-gray-500">{description}</small>' +
    '    </div>' +
    '    <div class="w-5">' +
    '        <button onClick="removeFavourite({dbid}, {id})">' +
    '            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">' +
    '                <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>' +
    '            </svg>' +
    '        </button>' +
    '    </div>' +
    '</div>'
