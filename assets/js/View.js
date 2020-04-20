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
                <th value='id'>ID</th>
                <th value='miniature'>Miniatura</th>
                <th>Remover</th>
                <th value='title' class='column-title'>Música</th>                
                <th value='artist'>Artista</th>
                <th value='album'>Álbum</th>
                <th value='release'>Data de Lançamento</th>
                <th value='rank'>Rank</th>
            </tr>
        `;

        musicas.forEach((x,n) => {
            if (n < this.numero_mostrar.value && n < musicas.length) {
                this.table.innerHTML += `
                    <tr>
                        <td>${x.id}</td>
                        <td class="text-center"><img class="img-cover" src="${x.miniature}"></td>
                        <td class="text-center"><button type='button' value='${x.link}' class='remove-music botao-remover'>x</button></td>
                        <td><a class='remove-music' target='_blank' href='${x.link}'>${x.title}</a></td>
                        <td>${x.artist}</td>
                        <td>${x.album}</td>
                        <td>${x.release.toLocaleDateString()}</td>
                        <td>${x.rank}</td>
                    </tr>
                `;
            }
        });
    }
}