import React, { CSSProperties, useContext } from "react";

import LanguageOption from "./Option";
import { Popover } from "src/components/UI";
import { ScrollContext } from "src/context/scroll-context";
import { StyledScrollLanguage } from "./Language.styled";
import { extractLanguages } from "src/lib/annotation-helpers";

const LanguageIcon = ({
  title,
  style = {},
}: {
  title: string;
  style?: CSSProperties;
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={style}>
      <title>{title}</title>
      <path d="M478.33 433.6l-90-218a22 22 0 00-40.67 0l-90 218a22 22 0 1040.67 16.79L316.66 406h102.67l18.33 44.39A22 22 0 00458 464a22 22 0 0020.32-30.4zM334.83 362L368 281.65 401.17 362zM267.84 342.92a22 22 0 00-4.89-30.7c-.2-.15-15-11.13-36.49-34.73 39.65-53.68 62.11-114.75 71.27-143.49H330a22 22 0 000-44H214V70a22 22 0 00-44 0v20H54a22 22 0 000 44h197.25c-9.52 26.95-27.05 69.5-53.79 108.36-31.41-41.68-43.08-68.65-43.17-68.87a22 22 0 00-40.58 17c.58 1.38 14.55 34.23 52.86 83.93.92 1.19 1.83 2.35 2.74 3.51-39.24 44.35-77.74 71.86-93.85 80.74a22 22 0 1021.07 38.63c2.16-1.18 48.6-26.89 101.63-85.59 22.52 24.08 38 35.44 38.93 36.1a22 22 0 0030.75-4.9z" />
    </svg>
  );
};

const ScrollLanguage = () => {
  const { state } = useContext(ScrollContext);
  const { activeLanguages, annotations } = state;

  const languages = annotations
    ? (extractLanguages(annotations) as string[])
    : [];

  return (
    <StyledScrollLanguage>
      <Popover>
        <Popover.Trigger>
          <LanguageIcon
            title="language"
            style={{ width: "16px", height: "16px" }}
          />
        </Popover.Trigger>
        <Popover.Content>
          <label>Language</label>
          {languages.map((lang) => (
            <LanguageOption
              isChecked={activeLanguages?.includes(lang)}
              key={lang}
              lang={lang}
            />
          ))}
        </Popover.Content>
      </Popover>
    </StyledScrollLanguage>
  );
};

export default ScrollLanguage;
