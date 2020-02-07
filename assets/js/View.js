class View {

    constructor() {
        this.table = document.querySelector('#table_musicas');
    }

    renderiza_total(musicas) {
        document.querySelector("#musicas_encontradas").innerHTML = musicas.length;
    }

    renderiza_table(musicas) {
        this.table.innerHTML = `
            <tr>
                <th value='id'>ID</th>
                <th value='miniature'>Miniatura</th>
                <th value='title'>Música</th>
                <th value='artist'>Artista</th>
                <th value='release'>Data de Lançamento</th>
                <th value='rank'">Rank</th>
            </tr>
        `;

        musicas.forEach((x,n) => {
            if (n < 100 && n < musicas.length) {
                this.table.innerHTML += `
                    <tr>
                        <td>${x.id}</td>
                        <td><img src="${x.miniature}"></td>
                        <td><a target='_blank' href='${x.link}'>${x.title}</a></td>
                        <td>${x.artist}</td>
                        <td>${x.release.toLocaleDateString()}</td>
                        <td >${x.rank}</td>
                    </tr>
                `;
            }
        });
    }
}