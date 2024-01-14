export async function create(req, res) {
    try {
        const client = await this.dbPool.connect()
        const { name, description } = req.body
        const result = await client.query(`
            INSERT INTO public.todo (name, description)
            VALUES ($1, $2) RETURNING id
        `, [name, description])
        await client.query('COMMIT')
        return res.code(200).send({
            statusCode: 200,
            content: {
                id: result.rows[0].id, 
                message: `record has been created id: ${result.rows[0].id}`
            }
        })
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, message: error.message });
    } finally {
        client.release()
    }
}

export async function getAll(req, res) {
    try {
        const client = await this.dbPool.connect()
        const queries = await client.query('SELECT id, name, description, createdat FROM public.todo')
        return res.code(200).send({
            statusCode: 200,
            content: queries.rows.map((row) => row)
        })
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, message: error.message });
    } finally {
        client.release()
    }
}

export async function update(req, res) {
    try {
        const client = await this.dbPool.connect()
        const { id } = req.params
        const { name, description } = req.body
        await client.query('UPDATE todo SET name=$1, description=$2 WHERE id=$3', [name, description, id])
        await client.query('COMMIT')
        return res.code(200).send({
            statusCode: 200,
            content: {
                message: `record has been updated id: ${id}`
            }
        })
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, message: error.message });
    } finally {
        client.release()
    }
}

export async function getDetail(req, res) {
    try {
        const client = await this.dbPool.connect()
        const { id } = req.params
        const queries = await client.query('SELECT id, name, description, createdat FROM public.todo WHERE id=$1', [id])
        return res.code(200).send({
            statusCode: 200,
            content: queries.rows[0]
        })
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, message: error.message });
    } finally {
        client.release()
    }
}

export async function remove(req, res) {
    try {
        const client = await this.dbPool.connect()
        const { id } = req.params
        await client.query('DELETE FROM public.todo WHERE id=$1', [id])
        return res.code(200).send({
            statusCode: 200,
            content: {
                message: `record has been removed id: ${id}`
            }
        })
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, message: error.message });
    } finally {
        client.release()
    }
}