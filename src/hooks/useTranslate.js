import useSelector from "../store/use-selector";
import { translate } from "../utils";

export const useTranslate = () => {
  const {lang} = useSelector(state => ({
    lang: state.language.key,
  }));
  return (wordKey, count) => translate(lang, wordKey, count);
};
