const Skills = require("../models/skillsModels")
const { dataSource } = require("../tools/utils");

const repository = dataSource.getRepository(Skills);


  /**
   * Retrieve all skills from db.
   * @returns skills array
   */
  const getAll = async () => {
    return await repository.find();
  }

  /**
   * Retrieve one skill from db.
   * @returns skills array
   */
  // getOneById: async (skillId) => {
  //   return await repository.findOneBy({id:skillId});
  // },

  /**
 * Retrieve a skill by name.
 * @param name skill name
 * @returns the skill
 */
const getByName = async (name) => {
    return await repository.findOneBy({
        name
    });
}

  /**
   * Create a new skill
   * @param skillRequest skill params
   * @returns the created skill
   */
  const create = async (name) => {
    const skill = await getByName(name);
    if (skill) {
        return skill;
    }
    return await repository.save({ name });
}

/**
 * Update an existing skill.
 * @param name new skill name
 * @param skillId existing skill id
 * @returns updated skill
 */
const update = async (name, skillId) => {
    const skill = await getByName(name);
    if (skill) {
        throw new Error('Skill already exists');
    }
    await repository.update(skillId, { name });
    return await repository.findOneBy({
        id: parseInt(skillId)
    });
}


module.exports = {
    getAll,
    getByName,
    create,
    update,
}


// autre manière d'écrire

// const getAll = async () => {
//   return await repository.find();

// const getAll = async () => {
//   return await repository.findOneBy({
//     name: name
//   });
// }

// const create = async () => {
//   const skill = await getByName(name);if(skill) {
//     return skill;
//   }
//   return await repository.save({ name });
// }

// const update = async (name, skillId) => {
// const skill = await getByName(name);
// if (skill) {
//   throw new Error("skill already exists");
// }
// await repository.update(skillId, { name});
// return await repository.findOneBy({
//   id: parseInt(skillId)
// });
// }

  // /**
  //  * Delete an existing skill.
  //  * @param skillId skill id to delete
  //  * @returns
  //  */
//   delete: async (skillId) => {
//     return await repository.delete(skillId);
//   },
// };
