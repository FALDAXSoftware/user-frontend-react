import React from "react";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Steps } from "antd";
import "antd/dist/antd.css";
import { TierWrapper } from "./tier_one";
import TierDocUpload from "../../SETTINGS/KYC/tier_doc_upload";
// Styled components
import {
  TierInnerWrap,
  TierCommonHead,
  TierContainer,
  TierStepBlock,
  TierStepContent
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";

const { Step } = Steps;

class TierTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.onChangeStep = this.onChangeStep.bind(this);
  }
  onChangeStep(current) {
    console.log("onChange:", current);
    this.setState({ current });
  }
  // onClickStep(e) {
  //   console.log("e.target", e.target);
  //   alert("step-click");
  // }
  render() {
    const { current } = this.state;
    console.log("sdjfhjksdhf", this.state.current);
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <TierInnerWrap>
            <TierCommonHead>Proof of Residence</TierCommonHead>
            <TierContainer>
              <TierStepBlock>
                <Steps
                  current={0}
                  onChangeStep={this.onChangeStep}
                  direction="vertical"
                  // onClick={this.onClickStep.bind(this)}
                >
                  <Step title="Proof of Residence" />
                  <Step title="Social Security Number" />
                </Steps>
              </TierStepBlock>
              <TierStepContent>
                {current === 0 && (
                  <TierDocUpload
                    // kycData={this.state.kycData}
                    docText={"Proof of Residence"}
                    // back_step={a => this.back_step(a)}
                    // next_step={a => this.next_step(a)}
                  />
                )}
                {current === 1 && (
                  <TierDocUpload
                  // kycData={this.state.kycData}
                  // docText={this.state.docType}
                  // back_step={a => this.back_step(a)}
                  // next_step={a => this.next_step(a)}
                  />
                )}
              </TierStepContent>
            </TierContainer>
          </TierInnerWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

export default TierTwo;
