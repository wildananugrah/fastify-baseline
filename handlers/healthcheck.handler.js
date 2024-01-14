export async function healthcheckHandler(req, res) {
    try {
        const client = await this.dbPool.connect()
        await client.query('SELECT 1 as healtcheck')
        return res.code(200).send({ statusCode: 200, app: true, db: true });
    } catch (error) {
        // console.error(error);
        return res.code(500).send({ statusCode: 500, app: false, db: false, message: error.message });
    }
    finally {
        client.release()
    }
}