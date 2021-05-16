import React, { useContext } from 'react'
import { SynthContext } from '../../contexts/SynthContextProvider';
import inputRowImg from '../../assets/images/InputRow.png'

import BaseModal from '../common/BaseModal'
import * as S from './styled'

export default function TutorialModal() {

  const { toggleTutorialModal } = useContext(SynthContext)

  return (
    <BaseModal toggleModal={toggleTutorialModal}>
      <S.Header>
        <S.Heading>Tutorial</S.Heading>
      </S.Header>
      <S.ContentWrapper>
        <S.Paragraph>
          MasterThesisTracker consists of four tracks and a control panel. Each track concists of 32 rows of input fields.
          Each row represents a beat in an 8/4 time signature and contains four input fields.
        </S.Paragraph>
        <S.SubHeading>Tracks</S.SubHeading>
        <S.TrackRowImg src={inputRowImg} alt="A row of input fields" />
        <S.Paragraph>
          The Yellow input represents a musical note. A musical note is entered by playing you computer keyboard
          like you would play a piano, where the "z" key represents a "C" note and the "," key represents the "C" note an octave above.
          You can change what octave the note you're about to put in will have by either pressing the "Q" and "W" buttons (- and +)
          while having the current input field active, or by pressing the octave buttons in the control panel.
        </S.Paragraph>
        <S.Paragraph>
          The Blue input field represents an instrument. At the moment there are 7 different instruments you can use:
          <ul>
            <li>0: Square wave</li>
            <li>1: Sine wave</li>
            <li>2: Sawtooth wave</li>
            <li>3: Triangle wave</li>
            <li>4: Kick</li>
            <li>5: Snare</li>
            <li>6: Hihat</li>
          </ul>
        </S.Paragraph>
        <S.Paragraph>
          The Green input field represents an effect type. At the moment you can only select between:
          <ul>
            <li>
              0: Volume
            </li>
            <li>
              1: Vibrato
            </li>
          </ul>
        </S.Paragraph>
        <S.Paragraph>Lastly the Orange input field represents the value of the effect chosen in the Green input field,
          which goes from 0-99
        </S.Paragraph>
        <S.SubHeading>Control Panel</S.SubHeading>
        <S.Paragraph>
          At the top of the control panel you can change the values for BPM (tempo) and Octave with the +/- buttons.
        </S.Paragraph>
        <S.Paragraph>
          Underneath you have the Master List and the Playback/Mode section.
          When building a song you will create different patterns. In the Master List you can then decide in what order
          your patterns are supposed to be played. You add and subtract a row in the master list with the +/- buttons. You can play and stop
          your track with the Play/Stop buttons and decide if you want to hear the whole song or just the currently selected pattern
          by choosing song mode.
        </S.Paragraph>
        <S.Paragraph>
          In the Handle Song section you can choose to create a new song or load one of your saved songs. You can also choose
          to publish your song, and make it available for others to listen to it, by pressing the "Show" button and saving.
          You unpublish your song by pressing the "Hide" button and saving. When pressing the "Load" button you can see all
          of your saved songs and select one to listen to or keep working on. You can also search for other users and listen
          to all of their published songs. You can however not save another users songs.
        </S.Paragraph>
        <S.Paragraph>
          Lastly, in the Handle Patterns section, you can manage your patterns. You can create a new pattern, which then can be selected
          in the dropdown list next to the buttons. If you select a pattern it will show up in the tracker. It will also be available
          in the Master List. You can clear a pattern if you want to start over, and you can copy, create a new one and then paste
          it to create a new similar pattern.
        </S.Paragraph>
      </S.ContentWrapper>
    </BaseModal>
  )
}
