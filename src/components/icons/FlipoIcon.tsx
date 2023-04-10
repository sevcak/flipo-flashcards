import React from 'react';

interface IconProps {
    color?: string;
    size?: number;
  }

const FlipoIcon = ({color = 'light', size}: IconProps) => {
  let svg: JSX.Element;

  switch (color) {
    case 'light':
    default:
      svg = (
        <svg width={size} height={size} viewBox={`0 0 500 500`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M106.835 457.466C103.127 457.488 99.5176 456.266 96.573 453.993C93.6284 451.72 91.5159 448.524 90.5677 444.908C86.5551 431.062 82.4099 417.265 78.3973 403.418C66.7329 363.156 55.0847 322.882 43.4525 282.596C29.6112 234.53 15.7738 186.459 1.94053 138.385C1.48263 136.805 1.13319 135.2 0.63914 133.644C-0.8189 129 0.30174 124.904 3.14552 121.172C5.30367 118.353 8.23762 116.239 11.5805 115.093C24.6667 110.364 37.9216 105.599 51.0319 100.907C80.6024 90.3713 110.177 79.8601 139.755 69.3732C167.735 59.4698 195.719 49.5826 223.707 39.7116C227.467 38.3865 231.226 37.0615 235.01 35.8337C238.76 34.6082 242.816 34.7371 246.482 36.1984C248.102 36.7606 249.586 37.6651 250.833 38.8516C252.079 40.0381 253.061 41.4793 253.712 43.0789C259.616 57.5572 265.629 71.9989 271.521 86.4893C285.435 120.697 299.333 154.914 313.214 189.138C327.626 224.651 342.025 260.164 356.413 295.676C362.494 310.702 368.519 325.751 374.488 340.825C375.48 343.153 376.149 345.607 376.476 348.119C377.308 356.519 371.186 362.877 365.993 364.81C359.667 367.156 353.352 369.526 347.002 371.812C307.036 386.294 267.071 400.752 227.105 415.186C190.956 428.234 154.77 441.237 118.548 454.196C116.138 455.047 113.8 455.885 111.39 456.627C109.887 456.987 108.367 457.267 106.835 457.466Z" fill="#161616"/>
        <path d="M492.709 81.9547C490.299 80.4837 487.636 80.2528 485.021 79.7908C468.457 76.8328 451.888 73.9152 435.315 71.0382C418.976 68.1936 402.636 65.3572 386.296 62.5288C366.591 59.1412 346.885 55.7658 327.179 52.4025C316.118 50.5183 305.044 48.7556 294.006 46.7863C289.066 45.9232 285.089 47.5521 281.583 50.9194C278.962 53.6202 277.102 56.9773 276.196 60.6445C275.425 63.2946 274.63 65.9325 273.847 68.5826C275.823 73.3723 277.799 78.1983 279.751 83.0001C292.885 115.275 306.261 148.098 319.094 179.85L321.504 185.649C335.916 221.161 350.315 256.678 364.703 292.199C371.33 308.574 377.259 323.356 382.778 337.409C384.085 340.513 384.953 343.786 385.356 347.134C386.561 359.789 378.127 369.806 369.089 373.161L364.594 374.826C359.835 376.601 354.955 378.473 350.038 380.187L329.915 387.481C302.055 397.607 273.401 408.025 244.963 418.273L273.726 428.533C301.698 438.453 329.678 448.344 357.666 458.207C364.402 460.638 371.15 462.972 377.946 465.209C384.26 467.275 390.128 465.209 394.225 459.994C395.867 457.647 397.042 455 397.684 452.202C409.091 412.701 420.502 373.201 431.917 333.701C445.654 286.016 459.371 238.318 473.068 190.608C481.72 160.444 490.323 130.272 498.879 100.092C499.385 98.305 499.626 96.4451 499.999 94.5973C500.007 92.0266 499.336 89.5001 498.055 87.278C496.773 85.0559 494.928 83.2184 492.709 81.9547Z" fill="url(#paint0_linear_618_2804)"/>
        <defs>
        <linearGradient id="paint0_linear_618_2804" x1="364.011" y1="61.0986" x2="274.727" y2="423.732" gradientUnits="userSpaceOnUse">
        <stop stop-color="#4EF4A4"/>
        <stop offset="1" stop-color="#49FFDE"/>
        </linearGradient>
        </defs>
        </svg>
      );
  }
  
  return (svg);
}

export default FlipoIcon;