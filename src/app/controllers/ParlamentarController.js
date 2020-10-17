import * as Yup from 'yup';
import Parlamentar from "../models/Parlamentar";
import axios from 'axios';

class ParlamentarController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      document: Yup.string().required(),
      avatar_url: Yup.string(),
      has_suspicions: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const parlamentarExists = await Parlamentar.findOne({where: {document: req.body.document}});

    if (parlamentarExists) {
      return res.status(400).json({error: 'Parlamentar already exists.'});
    }

    const {name, document, avatar_url, has_suspicions} = await Parlamentar.create(req.body);

    return res.json({
      name,
      document,
      avatar_url,
      has_suspicions
    });
  }

  async index_all(req, res) {
    const parlamentar = await Parlamentar.findAll({
      attributes: ['id', 'name', 'document', 'avatar_url', 'has_suspicions'],
    });

    return res.json(parlamentar);
  }

  async index_one(req, res) {
    const parlamentar = await Parlamentar.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'name', 'document', 'avatar_url', 'has_suspicions'],
    });

    async function manage_reimbursement(list_of_items) {
      return list_of_items.map(e => ({
        'document_value': e.document_value,
        'receipt': e.receipt.url,
        'subquota_description': e.subquota_description,
        'issue_date': e.issue_date,
        'suspicions': e.suspicions
      }))
    }

    const jarbas_url_hard_coded = 'http://jarbas.serenata.ai/api/chamber_of_deputies/reimbursement/'
    const params = {
      'search': parlamentar.name,
      'suspicions': 1,
      'order_by': 'issue_date'
    }
    const reimbursement = await axios.get(jarbas_url_hard_coded, { params })
    const reimbursement_parsed = await manage_reimbursement(reimbursement.data['results'])

    return res.json({
      'parlamentar_data': parlamentar,
      'reimbursements': reimbursement_parsed
    });
  }

  async delete(req, res) {
    const parlamentar = await Parlamentar.findByPk(req.params.id);

    if(parlamentar){
      await parlamentar.destroy()
      return res.json(parlamentar)
    }else{
      return res.status(409).json({error: 'Parlamentar not found. Cannot delete this.'});
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      has_suspicions: Yup.boolean().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const parlamentar = await Parlamentar.findByPk(req.params.id);

    if(parlamentar){
      await parlamentar.update(req.body);
      return res.json(parlamentar)
    }else{
      return res.status(409).json({error: 'Parlamentar not found. Cannot update this.'});
    }
  }

}

export default new ParlamentarController();
