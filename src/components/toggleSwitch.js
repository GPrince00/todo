import styled from "styled-components";
import Image from "next/image";

const ToggleSwitch = ({ changeTheme }) => {
  return (
    <Container>
      <input
        type="checkbox"
        id="hide-checkbox"
        onChange={() => changeTheme()}
      />
      <label for="hide-checkbox" className="toggle">
        <span className="toggle-button"></span>
        <Image
          className="night"
          alt="plus-icon"
          src="/night-mode.png"
          width={24}
          height={24}
        />
        <Image
          className="light"
          alt="plus-icon"
          src="/light-mode.png"
          width={24}
          height={24}
        />
      </label>
    </Container>
  );
};

export default ToggleSwitch;

const Container = styled.div`
  #hide-checkbox {
    opacity: 0;
    height: 0;
    width: 0;
  }

  .toggle {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 4rem;
    height: 2rem;
    background: #211042;
    border-radius: 50px;
    transition: 500ms;
    overflow: hidden;
  }

  .toggle-button {
    position: absolute;
    display: inline-block;
    z-index: 1;
    top: 2.3px;
    left: 3px;
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 50%;
    background: #faeaf1;
    overflow: hidden;
    box-shadow: 0 0 35px 4px rgba(255, 255, 255);
    transition: all 500ms ease-out;
  }

  .light {
    position: absolute;
    display: inline-block;
    right: 36px;
    bottom: 4px;
    z-index: 0;
  }

  .night {
    margin: 4px 0 30px 34px;
    right: 5px;
    bottom: 4px;
  }

  #hide-checkbox:checked + .toggle {
    background: #00a4ca;
  }

  #hide-checkbox:checked + .toggle .toggle-button {
    background: #f7ffff;
    transform: translateX(31px);
    box-shadow: 0 0 35px 5px rgba(255, 255, 255);
  }
`;
