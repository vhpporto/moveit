import { createContext, ReactNode, useContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'



interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengeContextData {
    level: number;
    challengeComplete: number; 
    currenteExperience: number; 
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    closeLevelUpModal: () => void,
    levelUp: () => void; 
    startNewChallenge: () => void
    resetChallenge: () => void
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children:  ReactNode;
    level: number,
    currentExperience: number,
    challengesComplete: number
}

export const ChallengeContext = createContext({} as ChallengeContextData)

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps
    ) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currenteExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengeComplete, setChallengeComplete] = useState(rest.challengesComplete ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)
        const [isLevelUpModal, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    } , [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currenteExperience))
        Cookies.set('challengeComplete', String(challengeComplete))
    } , [level, currenteExperience, challengeComplete])


    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = challenges[Math.floor(Math.random() * challenges.length)]
        
        setActiveChallenge(randomChallengeIndex)

        
        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted'){
            console.log('entrou')
            new Notification('Novo desafio', {
                body: `Valendo ${randomChallengeIndex.amount}xp`
            }) 
        }   
     }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        console.log('desafio completo')
        if (!activeChallenge) {
            console.log('!active')
            return
        }
        const { amount } = activeChallenge

        let finalExperience = currenteExperience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        console.log(finalExperience)
        console.log(challengeComplete)

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengeComplete(challengeComplete + 1)
    }

    return (
        <ChallengeContext.Provider 
        value={{
            level, 
            levelUp, 
            challengeComplete, 
            currenteExperience, 
            resetChallenge,
            startNewChallenge,
            activeChallenge,
            experienceToNextLevel,
            completeChallenge,
            closeLevelUpModal
            }}>
            {children}

            { isLevelUpModal && <LevelUpModal/> }
            
        </ChallengeContext.Provider>
    )
}