import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from './assets/close-icon'
import CryptoBanner from './assets/crypto-banner'

module.exports = class WelcomeModal extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    setRewardsDisclosureAccepted: PropTypes.func,
    rewardsDisclosureAccepted: PropTypes.bool,
  }

  constructor (props) {
    super(props)

    this.state = {
      isShowing: true,
    }
  }

  acceptDisclosure = () => {
    this.props.setRewardsDisclosureAccepted()
    this.hideModal()
  }

  hideModal = () => {
    this.setState({ isShowing: false })
  }

  openRewards = () => {
    chrome.tabs.update({
      url: `chrome://rewards`,
    })
  }

  render () {
    const { t } = this.context
    const { rewardsDisclosureAccepted } = this.props

    if (!this.state.isShowing || rewardsDisclosureAccepted) {
      return null
    }

    return (
      <div className={'welcome-modal'}>
        <div className={'__modal'}>
          <div className={'__close'} onClick={this.hideModal}>
            <CloseIcon />
          </div>
          <div>
            <CryptoBanner />
          </div>
          <div className={'__content'}>
            <span className={'__header'}>
              {t('welcomeCryptoWallets')}
            </span>
            <div className={'__div-line'}></div>
            <span className={'__disclosure'}>
              {t('cryptoWalletsDisclosure')}
              <span className={'__rewards'} onClick={this.openRewards}>
                {t('braveRewards')}
              </span>
            </span>
          </div>
          <div className={'__button-container'}>
            <button type={'button'} onClick={this.acceptDisclosure}>
              {t('disclosureConfirm')}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
