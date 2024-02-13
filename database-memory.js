import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
    // # indica que é uma chave privada, visivel apenas dentro dessa classe.
    #videos = new Map();

    list(search) {
        return Array
        .from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];
            
            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search)
            }

            // Caso o parâmetro search seja vazio, retornará true
            // o que significa que todos elementos serão mostrados.
            return true;
        })

    }

    create(video) {
        // Ao criar um vídeo, será gerada um Id aleatório:
        // UUID - Universal Unique ID
        const videoId = randomUUID();

        // O método set insere um valor em um dado do tipo Map.
        // Para isso, ele recebe dois parâmetros:
        // A chave, nesse caso, o Id do vídeo
        // E o valor, nese caso, os valores do vídeo.
        this.#videos.set(videoId, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }
}