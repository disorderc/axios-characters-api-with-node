const router = require("express").Router();
const axios = require("axios");

const characterServices = require("../services/characters.services")

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // next(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/create", (req, res, next) => {
    res.render("characters/create-character")
})

router.get("/characters/:id", (req, res, next) => {

    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // next("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))

});

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }

    characterServices
        .saveCharacter(character_data)
        .then(() => res.redirect("/characters"))
        .catch(err => next("ERROR", err))

})

router.get("/edit/:character_id", (req, res, next) => {
    const { character_id } = req.params

    characterServices
        .getOneCharacter(character_id)
        .then(response => res.render("characters/edit-character", { character: response.data }))
        .catch(err => next("ERROR", err))
})
router.post("/edit/:character_id", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const { character_id } = req.params
    const character_data = { name, occupation, weapon }
    characterServices
        .editCharacter(character_id, character_data)
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => next("ERROR", err))
})

router.post("/delete/:character_id", (req, res, next) => {
    const { character_id } = req.params

    characterServices
        .deleteCharacter(character_id)
        .then(() => res.redirect(`/characters`))
        .catch(err => next(err))
})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters