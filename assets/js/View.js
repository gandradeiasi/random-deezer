class View {

    constructor() {
        this.table = document.querySelector('#table_musicas');
        this.numero_mostrar = document.querySelector('#numero_mostrar');
    }

    renderiza_total(musicas) {
        document.querySelector("#musicas_encontradas").innerHTML = musicas.length;
    }

    renderiza_table(musicas) {
        this.table.innerHTML = `
            <tr>
                <th style="display:none" value='id'>ID</th>
                <th>Remover</th>
                <th value='miniature'>Miniatura</th>
                <th>Copiar</th>
                <th style="display:none" value='release'>Data de Lançamento</th>
                <th style="display:none" value='title' class='column-title'>Música</th>                
                <th style="display:none" value='artist'>Artista</th>
                <th style="display:none" value='album'>Álbum</th>
                <th style="display:none" value='rank'>Rank</th>
            </tr>
        `;

        musicas.forEach((x,n) => {
            if (n < this.numero_mostrar.value && n < musicas.length) {
                this.table.innerHTML += `
                    <tr>
                        <td style="display:none">${x.id}</td>
                        <td class="text-center"><button type='button' value='${x.link}' class='remove-music botao-remover'>x</button></td>
                        <td class="text-center"><img class="img-cover" src="${x.miniature}"></td>
                        <td>
                            <button onclick="ctrlC('${x.artist.replace(/['"]/,'')} - ${x.title.replace(/['"]/,'')}');">Salvar</button>
                            <button onclick="window.open('https://open.spotify.com/search/${x.artist.replace(/['"]/,'')} ${x.title.replace(/['"]/,'')}');">Spotify</button>
                        </td>
                        <td style="display:none">${new Date(x.release).toLocaleDateString()}</td>
                        <td style="display:none"><a class='remove-music' target='_blank' href='${x.link}'>${x.title}</a></td>
                        <td style="display:none">${x.artist}</td>
                        <td style="display:none">${x.album}</td>
                        <td style="display:none">${x.rank}</td>
                    </tr>
                `;
            }
        });
    }
}

function ctrlC(string) {
    var copyText = document.getElementById("ctrl-c");
    copyText.value = string;

    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    document.execCommand("copy");
}