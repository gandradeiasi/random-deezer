class TabelaMusica {
    constructor() {
        this.musicas = [];
        this.order_asc = '';
        this.order_by = '';

        if (localStorage.getItem('tabelaMusica') != 'null' && localStorage.getItem('tabelaMusica'))
            this.musicas = JSON.parse(localStorage.getItem('tabelaMusica'));
    }

    adiciona_musica(musica) {
        // fetch(g_url + '/playlist/6883673444/' + musica.id)
        //     .then(x => x.json())
        //     .then(x => console.log(x));

        if (!musica.release) return;
        this.musicas.push(musica);
        this.atualizaCookie();
    }

    order(mantem_order_by, order_by = this.order_by) {
        if (order_by) {
            this.order_by = order_by;

            if (mantem_order_by) this.order_asc = !this.order_asc;

            this.musicas.sort((a, b) => {
                if (this.order_asc) return a[order_by] < b[order_by] ? 1 : -1;
                else return a[order_by] < b[order_by] ? -1 : 1;
            });

            this.order_asc = !this.order_asc;
        }
    }

    atualizaCookie() {
        window.localStorage.setItem('tabelaMusica', JSON.stringify(this.musicas));
    }
}