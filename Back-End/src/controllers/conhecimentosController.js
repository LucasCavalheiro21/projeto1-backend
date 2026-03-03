import prisma from "../database/PrismaClient.js";

export class ConhecimentosController{

    // GET conhecimentos

    async listarConhecimentos(request, response){
        try {
            const { titulo, descricao, categoria, nivel } = request.query;
            const conhecimentos = await prisma.conhecimentos.findMany({

            // adicionando filtros

            include: { pessoa: true },
            orderBy: { titulo: "asc" },
            where: {
                ...(titulo && {
                titulo: {
                    contains: titulo,
                    mode: "insensitive"
                }
                }),

                ...(descricao && {
                descricao: {
                    contains: descricao,
                    mode: "insensitive"
                }
                }),

                ...(categoria && {
                categoria: {
                    contains: categoria,
                    mode: "insensitive"
                }
                }),

                ...(nivel && {
                nivel: {
                    contains: nivel,
                    mode: "insensitive"
                }
                })
            },
            });
            return response.status(200).json(conhecimentos);
        }catch(error){
            return response.status(500).json({ error: "Erro ao listar conhecimentos.", detail: error.message });

        }
    }

    // POST conhecimentos

    async criarConhecimentos(request, response){
        const { titulo, descricao, categoria, nivel, pessoa_id } = request.body;
        try{
            const conhecimentos = await prisma.conhecimentos.create({
                data: { titulo, descricao, categoria, nivel, pessoa_id }
            });
            return response.status(201).json(conhecimentos);
        }catch(error){
            return response.status(500).send();
        }
    };

    // PUT conhecimentos

    async atualizarConhecimentos(request, response){
        const { titulo, descricao, categoria, nivel, pessoa_id } = request.body;
        const { id } = request.params;
        try{
            const conhecimentos = await prisma.conhecimentos.findUnique({where: {id}});
            if(!conhecimentos){
                return response.status(404).json("Conhecimento não encontrado :(");
            }
            const conhecimentosUpdated = await prisma.conhecimentos.update({
                data: { titulo, descricao, categoria, nivel, pessoa_id },
                where: { id }
            });
            return response.status(200).json(conhecimentosUpdated);
        }catch(error){
            return response.status(500).send();
        }
    };

    // DELETE conhecimentos

    async deletarConhecimentos(request, response){
        const { id } = request.params;
        try{
            const conhecimentos = await prisma.conhecimentos.findUnique({where: { id }});
            if(!conhecimentos){
                return response.status(404).json("Conhecimento não encontrado :(");
            }
            await prisma.conhecimentos.delete({
                where: { id }
            });
            return response.status(204).send();
        }catch(error){
            return response.status(500).send();
        }
    };

}