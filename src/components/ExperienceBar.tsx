import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currenteExperience, experienceToNextLevel }  = useContext(ChallengeContext)

    const percentoToNextLevel = Math.round(currenteExperience * 100)   / experienceToNextLevel
    return (
        <header className={styles.experienceBar}>
            <span>{currenteExperience } xp</span>
            <div>
                <div style={{width:  `${percentoToNextLevel}%`, background: 'green'}}></div>
                <span className={styles.currentExperience} style={{left: `${percentoToNextLevel}%`}}>
                    {currenteExperience} px
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}