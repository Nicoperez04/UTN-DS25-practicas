import { Router } from 'express';
import { listBooks } from '../services/books.service';

export const legacySectionsRouter = Router();

async function listByCategoria(categoria: 'DEPORTE'|'FICCION'|'HISTORIA'|'INFANTIL') {
  const result = await listBooks({ categoria, page: 1, pageSize: 500 });
  return result.data; // los endpoints viejos devolvían array plano
}

legacySectionsRouter.get('/ficcion',  async (_req, res, next) => { try { res.json(await listByCategoria('FICCION'));  } catch (e) { next(e); } });
legacySectionsRouter.get('/deporte',  async (_req, res, next) => { try { res.json(await listByCategoria('DEPORTE'));  } catch (e) { next(e); } });
legacySectionsRouter.get('/historia', async (_req, res, next) => { try { res.json(await listByCategoria('HISTORIA')); } catch (e) { next(e); } });
legacySectionsRouter.get('/infantil', async (_req, res, next) => { try { res.json(await listByCategoria('INFANTIL')); } catch (e) { next(e); } });
