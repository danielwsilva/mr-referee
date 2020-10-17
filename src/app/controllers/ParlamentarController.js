import * as Yup from 'yup';
import Parlamentar from "../models/Parlamentar";

class ParlamentarController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      document: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'Enter correct Brazilian Document!').required(),
      avatar_url: Yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validation fails'});
    }

    const parlamentarExists = await Parlamentar.findOne({where: {document: req.body.document}});

    if (parlamentarExists) {
      return res.status(400).json({error: 'Parlamentar already exists.'});
    }

    const {name, document, avatar_url} = await Parlamentar.create(req.body);

    return res.json({
      name,
      document,
      avatar_url
    });
  }

  async index_all(req, res) {
    const parlamentar = await Parlamentar.findAll({
      attributes: ['id', 'name', 'document', 'avatar_url'],
    });

    return res.json(parlamentar);
  }

  async index_one(req, res) {
    const parlamentar = await Parlamentar.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'name', 'document', 'avatar_url'],
    });

    return res.json(parlamentar);
  }

}

export default new ParlamentarController();
