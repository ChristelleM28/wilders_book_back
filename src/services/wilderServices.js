const Skill = require("../models/skillsModels");
const Wilder = require("../models/wilderModels");
const { dataSource } = require("../tools/utils");

const wilderRepository = dataSource.getRepository(Wilder);
const skillRepository = dataSource.getRepository(Skill);

module.exports = {
  /**
   * Retrieve all wilders from db.
   * @returns wilders array
   */
  getAll: async () => {
    return await wilderRepository.find();
  },

  /**
   * Create a new wilder
   * @param wilderRequest wilder params
   * @returns the created wilder
   */
  create: async (wilderRequest) => {
    return await wilderRepository.save(wilderRequest);
  },

  /**
   * Update an existing wilder.
   * @param wilderRequest new wilder data
   * @param wilderId existing wilder id
   * @returns updated wilder
   */
  update: async (wilderRequest, wilderId) => {
    await wilderRepository.update(wilderId, wilderRequest);
    return await wilderRepository.findOneBy({
      id: parseInt(wilderId),
    });
  },

  /**
   * Delete an existing wilder.
   * @param wilderId wilder id to delete
   * @returns
   */
  delete: async (wilderId) => {
    return await wilderRepository.delete(wilderId);
  },

  addSkill: async (skillId, wilderId) => {
    const wilder = await wilderRepository.findOneBy({
      id: parseInt(wilderId),
    });

    const skill = await skillRepository.findOneBy({
      id: parseInt(skillId),
    });

    if (!wilder || !skill) {
      throw new Error("Wilder or skill not found");
    }

    if (wilder.skills.find((wilderSkill) => wilderSkill.id === skill.id)) {
      return wilder;
    }

    wilder.skills.push(skill);
    return await wilderRepository.save(wilder);
  },
};
