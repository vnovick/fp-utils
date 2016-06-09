import 'babel-polyfill';
import assert from 'assert'
import { fnCompose, fnCurry } from './lib/';


const jediCouncil = [
  { name: 'Yoda', origin: 'Dagobah', species: 'Unknown' },
  { name: 'Plo Koon', origin: 'Dorin', species: 'Kel Dor' },
  { name: 'Mace Windu', origin: 'Haruun Kal', species: 'Korunnai'},
  { name: 'Ki-Adi-Mundi', origin: 'Cerea', species: 'Cerean'},
  { name: 'Saesee tiin', origin: 'Iktotch', species: 'Iktotchi'},
  { name: 'yaddle', origin: 'Unknown', species: 'Unknown'},
  { name: 'even piell', origin: 'Haruun Kal', species: ''},
  { name: 'O. Rancisis', origin: 'Thisspias', species: 'Thisspiasian'},
  { name: 'Adi Gallia', origin: 'Tholothian', species: 'Tholothian'},
  { name: 'Yarael Poof', origin: '', species: 'Quermian'},
  { name: 'even piell', origin: 'Zabrak', species: 'Lannik'},
  { name: 'Obi-Wan Kenobi', origin: 'Stewjon', species: 'Human'},
]
describe('Test all provided utils', () => {
  describe('fnCompose', () => {
    it("Should be able to compose two functions", () => {
      let isSpeciesUnknown =  member =>
       member.species === 'Unknown'

      let getUnknownSpecies = (x) =>
          x.filter(isSpeciesUnknown)

      let printUnknownSpecies = (x) =>
          x.map( member =>
              `${member.name} is ${member.species} specie born on ${member.origin}` )

      let getAndPrint = fnCompose(printUnknownSpecies, getUnknownSpecies)

      assert.deepEqual(
        getAndPrint(jediCouncil),
        ["Yoda is Unknown specie born on Dagobah", "yaddle is Unknown specie born on Unknown"]
      )
    })
  })
  describe('fnCurry', () => {
    let getJediWelcome = (name, species, origin) => `Welcome, ${name}, the ${species} from ${origin}`
    it("CurriedFunction(argument) a function", () => {
      let curriedWelcome = fnCurry(getJediWelcome);
      assert.equal(typeof curriedWelcome('Yoda'), 'function')
    })
    it("CurriedFunction(argument)(argument) should return a function", () => {
      let curriedWelcome = fnCurry(getJediWelcome);
      assert.equal(typeof curriedWelcome('Yoda')('Dagobah'), 'function')
    })
    it("CurriedFunction(argument)(argument)(argument) should return a string", () => {
      let curriedWelcome = fnCurry(getJediWelcome);
      assert.equal(typeof curriedWelcome('Yoda')('Dagobah')('Unknown'), 'string')
    })
    it("CurriedFunction(argument)(argument)(argument) should return a CORRECT string", () => {
      let curriedWelcome = fnCurry(getJediWelcome);
      assert.equal(curriedWelcome('Yoda')('Dagobah')('Unknown'), 'Welcome, Yoda, the Dagobah from Unknown')
    })
  })
})
