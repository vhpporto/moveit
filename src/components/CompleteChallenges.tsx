import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengeContext'
import styles from '../styles/components/CompleteChallenges.module.css'

export function CompleteChallenges() {
    const { challengeComplete }  = useContext(ChallengeContext)

    return (
        <div className={styles.completeChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengeComplete}</span>
        </div>
    )
}