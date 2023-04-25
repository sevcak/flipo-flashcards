import { useColorScheme, View } from "react-native";
import React from "react";
import Svg, { Path, Mask, Ellipse, G, Defs, ClipPath, Rect, Use } from "react-native-svg";
import colorSchemes from "../assets/colorSchemes";

const FlipoIcons = (props) => {
  let type = props.type == 'outline' ? 'outline' : 'solid'
  let color = props.color != undefined ? props.color : colorSchemes[useColorScheme()].secondary;
  let size = props.size != undefined ? props.size : 50;
  let icon = null;
  
  if (props.name == undefined) {
    console.error('No icon name set in FlipoIcons element.');
    return null;
  } else {
    switch (props.name) {
      case 'card':
        icon = (
          <CardIcon type={type} size={size} color={color}/>
        );
        break;
      case 'profile':
        icon = (
          <ProfileIcon type={type} size={size} color={color}/>
        );
        break;
      case 'gear':
        icon = (
          <GearIcon type={type} size={size} color={color}/>
        );
        break;
      case 'back-arrow':
        icon = (
          <BackArrowIcon type={type} size={size} color={color}/>
        );
        break;
      case 'google-button':
        icon = (<GoogleButton size={size}/>);
        break;
      default:
        console.error(`An icon with the name ${props.name} doesn't exist in FlipoIcons.`);
        return null;
    }
    return (props.style)
      ? (<View style={props.style}>{icon}</View>)
      : icon;
  }
}

const ProfileIcon = ({ type, size, color }) => {
  if (type == undefined || type == "solid") {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Ellipse cx={25} cy={12.437} rx={12.709} ry={12.437} fill={color} />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M.206 46.374C-.459 48.19.974 50 2.908 50h44.184c1.934 0 3.367-1.81 2.702-3.626C45.83 35.558 36.224 27.926 25 27.926c-11.223 0-20.831 7.632-24.794 18.448Z"
          fill={color}
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M35.709 12.437c0 5.724-4.754 10.438-10.709 10.438S14.291 18.16 14.291 12.437 19.045 2 25 2s10.709 4.713 10.709 10.437Z"
          stroke={color}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <Mask id="a" fill="#fff">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.206 46.374C-.459 48.19.974 50 2.908 50h44.184c1.934 0 3.367-1.81 2.702-3.626C45.83 35.558 36.224 27.926 25 27.926c-11.223 0-20.831 7.632-24.794 18.448Z"
          />
        </Mask>
        <Path
          d="m49.794 46.374-3.756 1.376 3.756-1.376Zm-49.588 0-3.755-1.376 3.755 1.376ZM2.908 54h44.184v-8H2.908v8ZM25 31.926c9.3 0 17.563 6.34 21.038 15.824l7.512-2.752C49.099 32.85 38.147 23.926 25 23.926v8ZM3.962 47.75C7.437 38.266 15.701 31.926 25 31.926v-8c-13.147 0-24.099 8.924-28.55 21.072l7.512 2.752ZM47.092 54c4.333 0 8.206-4.227 6.458-9.002l-7.512 2.752a1.414 1.414 0 0 1 .196-1.303c.227-.299.554-.447.858-.447v8ZM2.908 46c.304 0 .631.148.858.447.25.328.366.84.196 1.303l-7.511-2.752C-5.3 49.773-1.425 54 2.908 54v-8Z"
          fill={color}
          mask="url(#a)"
        />
      </Svg>
    );
  }
};

const CardIcon = ({ type, size, color }) => {
  if (type == undefined || type == "solid") {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path fill="none" d="M0 0h50v50H0z" />
        <Path
          d="M14.186 50a2.388 2.388 0 0 1-1.363-.411 2 2 0 0 1-.797-1.075c-.533-1.639-1.083-3.272-1.616-4.91-1.549-4.766-3.096-9.532-4.64-14.3L.258 12.236c-.061-.187-.108-.377-.173-.561-.194-.55-.045-1.035.333-1.476a2.394 2.394 0 0 1 1.12-.72C3.275 8.92 5.035 8.356 6.776 7.8a8787.56 8787.56 0 0 1 11.781-3.732c3.716-1.172 7.431-2.342 11.148-3.51.499-.157.998-.314 1.5-.46a2.492 2.492 0 0 1 1.524.044c.215.066.412.173.578.314.165.14.295.31.382.5.784 1.714 1.582 3.423 2.365 5.138a21960.182 21960.182 0 0 1 11.272 24.758c.807 1.778 1.607 3.56 2.4 5.343.132.276.22.566.264.864.11.994-.703 1.746-1.392 1.975-.84.278-1.679.558-2.522.829a16990.66 16990.66 0 0 1-15.92 5.133c-4.8 1.544-9.605 3.083-14.415 4.617-.32.1-.63.2-.95.288-.2.042-.402.075-.605.099Z"
          fill={color}
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <G clipPath="url(#a)">
          <Path
            d="m30.86 4.39.3.64c.42.91.84 1.81 1.25 2.72 1.853 4.053 3.717 8.103 5.59 12.15l5.73 12.61c.52 1.14 1 2.28 1.55 3.42l-.38.13-15.97 5.13-13.66 4.38c-.09-.26-.17-.51-.25-.77l-.81-2.43c-1.54-4.767-3.083-9.533-4.63-14.3l-5-15.38L8 11.61l11.76-3.73 11.1-3.49ZM31.9 0a2.3 2.3 0 0 0-.69.1c-.51.14-1 .3-1.51.46L18.56 4.07 6.78 7.8 1.54 9.48a2.32 2.32 0 0 0-1.12.72 1.42 1.42 0 0 0-.34 1.47c.07.19.12.38.18.57 1.827 5.693 3.663 11.38 5.51 17.06 1.54 4.767 3.087 9.533 4.64 14.3.53 1.64 1.08 3.27 1.62 4.91a2 2 0 0 0 .79 1.08c.399.27.869.412 1.35.41.2 0 .4-.06.6-.1l1-.29L30.16 45l15.92-5.14L48.6 39a2 2 0 0 0 1.39-2 2.86 2.86 0 0 0-.26-.86l-2.4-5.35c-1.907-4.2-3.82-8.403-5.74-12.61-1.84-4.047-3.687-8.097-5.54-12.15-.78-1.65-1.58-3.36-2.36-5.03a1.55 1.55 0 0 0-.38-.5 1.83 1.83 0 0 0-.58-.32A2.63 2.63 0 0 0 31.9 0Z"
            fill={color}
          />
        </G>
        <Defs>
          <ClipPath id="a">
            <Path fill="#fff" d="M0 0h50v50H0z" />
          </ClipPath>
        </Defs>
      </Svg>
    );
  }
};


const GearIcon = ({ type, size, color }) => {
  if (type == undefined || type == "solid") {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path fill="none" d="M1 1h50v50H1z" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.915 3.836c-1.128-3.934-6.702-3.934-7.83 0-.791 2.76-4.113 3.856-6.392 2.11l-.403-.309c-3.17-2.429-7.527.853-6.068 4.57 1.042 2.656-.994 5.505-3.844 5.38l-.325-.015c-3.97-.174-5.601 5.028-2.241 7.15 2.408 1.522 2.408 5.034 0 6.555-3.36 2.123-1.73 7.325 2.24 7.15l.326-.013c2.85-.126 4.886 2.723 3.844 5.379-1.459 3.717 2.898 6.999 6.068 4.57l.403-.309c2.279-1.746 5.6-.65 6.392 2.11 1.128 3.934 6.702 3.934 7.83 0 .791-2.76 4.113-3.856 6.392-2.11l.403.309c3.17 2.429 7.527-.853 6.068-4.57-1.042-2.656.994-5.505 3.844-5.38l.325.015c3.97.174 5.601-5.028 2.241-7.15-2.408-1.522-2.408-5.034 0-6.555 3.36-2.123 1.73-7.325-2.24-7.15l-.326.013c-2.85.126-4.886-2.723-3.844-5.379 1.459-3.717-2.898-6.999-6.068-4.57l-.403.309c-2.279 1.746-5.6.65-6.392-2.11Zm-3.46 29.153c4.277 0 7.743-3.325 7.743-7.426 0-4.1-3.466-7.425-7.743-7.425-4.276 0-7.742 3.324-7.742 7.425s3.466 7.426 7.742 7.426Z"
          fill={color}
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path fill="none" d="M1 1h50v50H1z" />
        <Mask id="a" fill="#fff">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.915 3.836c-1.128-3.934-6.702-3.934-7.83 0-.791 2.76-4.113 3.856-6.392 2.11l-.403-.309c-3.17-2.429-7.527.853-6.068 4.57 1.042 2.656-.994 5.505-3.844 5.38l-.325-.015c-3.97-.174-5.601 5.028-2.241 7.15 2.408 1.522 2.408 5.034 0 6.555-3.36 2.123-1.73 7.325 2.24 7.15l.326-.013c2.85-.126 4.886 2.723 3.844 5.379-1.459 3.717 2.898 6.999 6.068 4.57l.403-.309c2.279-1.746 5.6-.65 6.392 2.11 1.128 3.934 6.702 3.934 7.83 0 .791-2.76 4.113-3.856 6.392-2.11l.403.309c3.17 2.429 7.527-.853 6.068-4.57-1.042-2.656.994-5.505 3.844-5.38l.325.015c3.97.174 5.601-5.028 2.241-7.15-2.408-1.522-2.408-5.034 0-6.555 3.36-2.123 1.73-7.325-2.24-7.15l-.326.013c-2.85.126-4.886-2.723-3.844-5.379 1.459-3.717-2.898-6.999-6.068-4.57l-.403.309c-2.279 1.746-5.6.65-6.392-2.11Zm-3.46 29.153c4.277 0 7.743-3.325 7.743-7.426 0-4.1-3.466-7.425-7.743-7.425-4.276 0-7.742 3.324-7.742 7.425s3.466 7.426 7.742 7.426Z"
          />
        </Mask>
        <Path
          d="M22.085 3.836 18.24 2.733l3.845 1.103Zm7.83 0 3.845-1.103-3.845 1.103Zm-14.222 2.11L13.26 9.12l2.433-3.175Zm-.403-.309 2.433-3.175-2.433 3.175Zm-6.068 4.57-3.724 1.461 3.724-1.46Zm-3.844 5.38.176-3.997-.176 3.996Zm-.325-.015-.176 3.996.176-3.996Zm-2.241 7.15L.675 26.105l2.137-3.381Zm0 6.555L.675 25.896l2.137 3.381Zm2.24 7.15.176 3.997-.175-3.996Zm.326-.013.176 3.996-.176-3.996Zm3.844 5.379 3.723 1.461-3.723-1.461Zm6.068 4.57 2.433 3.175-2.433-3.175Zm.403-.309L13.26 42.88l2.433 3.175Zm6.392 2.11-3.845 1.103 3.845-1.103Zm7.83 0-3.845-1.102 3.845 1.102Zm6.392-2.11 2.433-3.175-2.433 3.175Zm.403.309-2.433 3.175 2.433-3.175Zm6.068-4.57 3.724-1.461-3.724 1.46Zm3.844-5.38.175-3.996-.175 3.997Zm.325.015-.175 3.996.175-3.996Zm2.241-7.15 2.137-3.382-2.137 3.381Zm0-6.555-2.137-3.382 2.137 3.382Zm-2.24-7.15-.176-3.997.175 3.996Zm-.326.013.175 3.997-.175-3.997Zm-3.844-5.379 3.724 1.461-3.724-1.46Zm-6.068-4.57-2.433-3.175 2.433 3.175Zm-.403.309L38.74 9.12l-2.433-3.175ZM25.93 4.938c.02-.067.035-.084.027-.073a.137.137 0 0 1-.03.03c-.01.006-.01.004.005 0a.24.24 0 0 1 .068-.01.24.24 0 0 1 .068.01c.014.004.014.006.005 0a.135.135 0 0 1-.03-.03c-.008-.01.008.006.027.073l7.69-2.205c-2.236-7.797-13.284-7.797-15.52 0l7.69 2.205ZM13.26 9.121c4.517 3.461 11.101 1.287 12.67-4.183l-7.69-2.205a.125.125 0 0 1-.011.029v.001a.095.095 0 0 1-.036.02.096.096 0 0 1-.04.005h-.001s-.01-.004-.026-.017L13.26 9.12Zm-.403-.309.403.309 4.866-6.35-.403-.309-4.866 6.35Zm.088-.066a.304.304 0 0 1-.014-.046v.014a.265.265 0 0 1-.012.085c-.008.025-.016.036-.014.034a.116.116 0 0 1 .022-.02.114.114 0 0 1 .026-.016c.001 0-.011.004-.037.005a.264.264 0 0 1-.085-.012c-.011-.003-.016-.006-.013-.005a.302.302 0 0 1 .04.027l4.865-6.35C11.337-2.43 2.56 4.18 5.498 11.668l7.447-2.922ZM5.203 19.583c5.74.252 9.841-5.487 7.742-10.837l-7.447 2.922c.004.011.003.01.001-.001a.132.132 0 0 1 0-.033c.003-.019.008-.024.006-.02-.003.004 0-.003.017-.011a.135.135 0 0 1 .03-.011c.012-.003.013-.001.002-.002l-.351 7.993Zm-.326-.015.326.015.35-7.993-.325-.014-.35 7.992Zm.072-.227c-.042-.026-.037-.032-.015-.003.022.028.04.063.052.098.02.062.005.076.014.046.01-.03.015-.01-.038.03a.332.332 0 0 1-.098.05c-.035.011-.036.004.013.006l.351-7.992c-8.067-.354-11.38 10.215-4.553 14.528l4.274-6.763Zm0 13.318c4.892-3.091 4.892-10.227 0-13.318L.675 26.104c.006.004 0 0-.012-.012a.2.2 0 0 1-.03-.042.11.11 0 0 1-.015-.05c0-.005 0-.023.016-.05a.199.199 0 0 1 .029-.041c.011-.013.018-.017.012-.013l4.274 6.763Zm-.072-.227c-.05.002-.048-.005-.013.005.033.01.069.029.098.051.053.04.048.06.038.03-.009-.03.007-.017-.014.046a.332.332 0 0 1-.052.098c-.022.029-.027.023.015-.003L.675 25.896c-6.827 4.313-3.514 14.882 4.553 14.528l-.35-7.992Zm.326-.015-.326.015.351 7.992.326-.014-.351-7.993Zm7.742 10.837c2.1-5.35-2.001-11.089-7.742-10.837l.35 7.993c.012 0 .01 0 0-.002a.13.13 0 0 1-.03-.01c-.018-.01-.02-.016-.018-.012.002.003-.003-.001-.005-.02a.132.132 0 0 1 0-.033c0-.01.002-.012-.002-.001l7.447 2.922Zm-.088-.066a.307.307 0 0 1-.04.026c-.002.002.002 0 .014-.004a.263.263 0 0 1 .085-.012c.026 0 .038.005.037.005a.11.11 0 0 1-.026-.016.113.113 0 0 1-.022-.02c-.002-.002.007.009.014.034a.265.265 0 0 1 .013.085c0 .011-.002.017-.002.014l.015-.046-7.447-2.922c-2.938 7.489 5.84 14.099 12.225 9.206l-4.866-6.35Zm.403-.309-.403.309 4.866 6.35.403-.309-4.866-6.35Zm12.67 4.183c-1.569-5.47-8.153-7.644-12.67-4.183l4.866 6.35c.017-.013.025-.016.026-.017h.001a.098.098 0 0 1 .04.006.093.093 0 0 1 .035.019l.001.001s.005.008.011.029l7.69-2.205Zm.14 0c-.02.067-.035.084-.027.073a.134.134 0 0 1 .03-.03c.01-.006.01-.004-.005 0a.237.237 0 0 1-.068.01.238.238 0 0 1-.068-.01c-.014-.004-.014-.006-.005 0 .012.009.024.02.03.03.008.01-.008-.006-.027-.073l-7.69 2.205c2.236 7.797 13.284 7.797 15.52 0l-7.69-2.205Zm12.67-4.183c-4.517-3.461-11.101-1.287-12.67 4.183l7.69 2.205a.125.125 0 0 1 .011-.029v-.001a.093.093 0 0 1 .036-.02.094.094 0 0 1 .04-.005h.001s.01.004.026.017l4.866-6.35Zm.403.309-.403-.309-4.866 6.35.403.309 4.866-6.35Zm-.088.066c.01.028.014.043.014.046v-.014c-.001-.027.003-.058.012-.085.008-.025.015-.036.014-.035a.113.113 0 0 1-.021.021.115.115 0 0 1-.027.016c-.001 0 .011-.004.037-.005.029-.001.06.004.085.012.012.003.016.006.013.005a.307.307 0 0 1-.04-.027l-4.865 6.35c6.386 4.893 15.163-1.717 12.225-9.206l-7.447 2.922Zm7.742-10.837c-5.74-.252-9.841 5.487-7.742 10.837l7.447-2.922c-.004-.011-.003-.01-.001.001a.131.131 0 0 1 0 .033c-.003.019-.008.023-.006.02.003-.004 0 .002-.017.011a.132.132 0 0 1-.03.011c-.012.002-.014.001-.002.002l.351-7.993Zm.326.015-.326-.015-.35 7.993.325.014.35-7.992Zm-.072.227c.042.026.037.032.015.003a.333.333 0 0 1-.052-.098c-.02-.063-.005-.076-.014-.046-.01.03-.015.01.038-.03a.334.334 0 0 1 .098-.05c.035-.011.036-.004-.013-.006l-.351 7.992c8.067.354 11.38-10.215 4.553-14.528l-4.274 6.763Zm0-13.318c-4.892 3.091-4.892 10.227 0 13.318l4.274-6.763c-.006-.004 0 0 .012.012a.201.201 0 0 1 .03.042.11.11 0 0 1 .015.05.11.11 0 0 1-.015.05.202.202 0 0 1-.03.041c-.011.013-.018.017-.012.013l-4.274-6.763Zm.072.227c.05-.002.048.005.013-.005a.332.332 0 0 1-.098-.051c-.053-.04-.048-.06-.038-.03.009.03-.007.016.014-.046a.332.332 0 0 1 .052-.098c.022-.029.027-.023-.015.003l4.274 6.763c6.827-4.313 3.514-14.882-4.553-14.528l.35 7.992Zm-.326.015.326-.015-.351-7.992-.326.014.351 7.993ZM39.055 8.746c-2.1 5.35 2.001 11.089 7.742 10.837l-.35-7.993c-.013 0-.01 0 0 .002s.021.006.03.01c.018.01.02.016.018.012-.002-.004.003.001.005.02a.131.131 0 0 1 0 .033c0 .01-.002.012.002.001l-7.447-2.922Zm.088.066a.302.302 0 0 1 .04-.027.263.263 0 0 1-.098.017c-.027 0-.04-.005-.038-.005.003.001.013.006.027.016.013.01.02.018.022.02 0 .002-.007-.009-.015-.034a.263.263 0 0 1-.013-.085c0-.011.002-.016.002-.014a.304.304 0 0 1-.015.046l7.447 2.922C49.44 4.18 40.662-2.43 34.277 2.462l4.866 6.35Zm-.403.309.403-.309-4.866-6.35-.403.309 4.866 6.35ZM26.07 4.938c1.569 5.47 8.153 7.644 12.67 4.183l-4.866-6.35c-.017.013-.026.016-.026.016h-.001a.095.095 0 0 1-.04-.005.095.095 0 0 1-.035-.019l-.001-.001s-.005-.008-.011-.029l-7.69 2.205Zm4.128 20.625c0 1.736-1.516 3.426-3.743 3.426v8c6.326 0 11.743-4.96 11.743-11.426h-8Zm-3.743-3.425c2.227 0 3.743 1.69 3.743 3.425h8c0-6.466-5.417-11.425-11.743-11.425v8Zm-3.742 3.425c0-1.736 1.516-3.425 3.742-3.425v-8c-6.325 0-11.742 4.96-11.742 11.425h8Zm3.742 3.426c-2.226 0-3.742-1.69-3.742-3.426h-8c0 6.466 5.417 11.426 11.742 11.426v-8Z"
          fill={color}
          mask="url(#a)"
        />
      </Svg>
    );
  }
};

const BackArrowIcon = ({ type, size, color }) => {
  if (type == undefined || type == "solid") {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.247 25 39.22 12.968c2.951-2.967 2.951-7.776 0-10.743a7.531 7.531 0 0 0-10.69 0L11.215 19.628c-2.952 2.967-2.952 7.777 0 10.744L28.53 47.775a7.531 7.531 0 0 0 10.689 0c2.951-2.966 2.951-7.776 0-10.743L27.247 25Z"
          fill={color}
        />
      </Svg>
    );
  } else {
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.852 25.288c.063.601.324 1.185.782 1.646L31.95 44.337a2.711 2.711 0 0 0 3.848 0 2.744 2.744 0 0 0 0-3.867L20.406 25 35.798 9.53a2.744 2.744 0 0 0 0-3.867 2.711 2.711 0 0 0-3.848 0L14.634 23.066a2.73 2.73 0 0 0-.782 2.223ZM27.247 25 39.22 12.968c2.951-2.967 2.951-7.776 0-10.743a7.531 7.531 0 0 0-10.69 0L11.215 19.628c-2.952 2.967-2.952 7.777 0 10.744L28.53 47.775a7.531 7.531 0 0 0 10.689 0c2.951-2.966 2.951-7.776 0-10.743L27.247 25Z"
          fill={color}
        />
      </Svg>
    );
  }
};

const GoogleButton = ({ size }) => {
  return (
    <Svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Defs>
        <Rect id="b" x={0} y={0} width={40} height={40} rx={2} />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <G transform="translate(3 3)" filter="url(#a)">
          <Use fill="#FFF" xlinkHref="#b" />
          <Use xlinkHref="#b" />
          <Use xlinkHref="#b" />
          <Use xlinkHref="#b" />
        </G>
        <Path
          d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
          fill="#4285F4"
        />
        <Path
          d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32Z"
          fill="#34A853"
        />
        <Path
          d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
          fill="#FBBC05"
        />
        <Path
          d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71Z"
          fill="#EA4335"
        />
        <Path d="M14 14h18v18H14V14Z" />
      </G>
    </Svg>
  );
}

export default FlipoIcons;