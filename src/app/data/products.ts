// Shared product data used across components
export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "earthen-taper-holder",
    name: "Earthen Taper Holder",
    price: "$65",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uhNziXwI4klBpkHu0hw7CXJLZzWQZKc3fO5gDegtOzZ-rEFIJa6h_vokid2VVaoqOrLzFe3LFUtXr782fEdKg1AONo2fjZVlYbb-EekQsnfJg3vUaz0jimmHPUIDM7TJNxSf1eeV1RZuh51lSt-4rFUDqI74yOXLSw9rJ0paoamqu08qrrxtk8padsxXHN_EVLEUOtvPXJqwlLq5q8QF13_7lGs4grky1fsJI3gi7KD971zakzyesJ1zl4Z",
    category: "Home Decor",
  },
  {
    id: "ritual-bath-salts",
    name: "Ritual Bath Salts",
    price: "$38",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uiTXxJxNd22MSH8Z5bFRXlnAMzbMWSWozzTIxGE-HcclbC1M14lI-rWlcdFZA31Rp8jqhaMEDFvWvM9VUTvWvyJkzBjeDPhjxfEu4I02ZVoXR3niEp4I8Lv1OtAnteAaytm_H218QPtrMPd3Wn9-RWLzB_GvWhGamgCRKPtN6P_rtV2OQFo2Dg73A3-QCGV_G4IXaBr8wQa__0RBwHcMc8pHc9py_6OcxP5dSHGPoduNfghmN6yNzz6EGo",
    category: "Bath & Body",
  },
  {
    id: "resin-adornments",
    name: "Resin Adornments",
    price: "$120",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uhBavEvRh42g7NR2UW0NGl98W98ms4lQ-74a-JDM1UMiPf_9rEQxoRF6jmG0YGy-MJC2cvzvHnUV-Aug-4QEuU85h4b1Bk_KdNeDV-W5oxa7U9GTnlqI5RaBm7LfTIVvPJ0Q0cSVnMYB7Bfel8gR1vr9q8bIIDwQ6bE4avOyLZjPSIHws87wnrctpyQnmBdDnxerEF7gAWSmmPTxVoIqTJ7TXADtHS_MSTBJpG4yoG_n_bBSTWfDf2joV1p",
    category: "Adornments",
  },
  {
    id: "amber-ritual-candle",
    name: "Amber Ritual Candle",
    price: "$45",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uiIbscgd3Rkj0AiW7GXl_LyiK_WAIqrH-zlq3Q4JMgfsa_26JSrkXPMvg_5RymxAIFUmKSUKr1SXmTRNLt7ahzOKRlmeqLRmp6EPQTYGGrUpppXdYnpVQi1uIbMT7wXTfqkoKjq6ix9S5ZgaJ3Ds4kHXib-Mga-99ocvNrFO_TeMXH0jvtWlGRNx4a7ivXutisL8wyTXxr5VLLUQSJ-f7tEhb9kd9uCuNMgVyOvnmN1WA-DNz15RlWw2tt7",
    category: "Home Fragrance",
  },
];

export const vibeCategories = [
  {
    id: "home-fragrance",
    name: "Home Fragrance",
    price: "$45",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uiIbscgd3Rkj0AiW7GXl_LyiK_WAIqrH-zlq3Q4JMgfsa_26JSrkXPMvg_5RymxAIFUmKSUKr1SXmTRNLt7ahzOKRlmeqLRmp6EPQTYGGrUpppXdYnpVQi1uIbMT7wXTfqkoKjq6ix9S5ZgaJ3Ds4kHXib-Mga-99ocvNrFO_TeMXH0jvtWlGRNx4a7ivXutisL8wyTXxr5VLLUQSJ-f7tEhb9kd9uCuNMgVyOvnmN1WA-DNz15RlWw2tt7",
  },
  {
    id: "bath-rituals",
    name: "Bath Rituals",
    price: "$38",
    image:
      "https://lh3.googleusercontent.com/aida/ADBb0uiTXxJxNd22MSH8Z5bFRXlnAMzbMWSWozzTIxGE-HcclbC1M14lI-rWlcdFZA31Rp8jqhaMEDFvWvM9VUTvWvyJkzBjeDPhjxfEu4I02ZVoXR3niEp4I8Lv1OtAnteAaytm_H218QPtrMPd3Wn9-RWLzB_GvWhGamgCRKPtN6P_rtV2OQFo2Dg73A3-QCGV_G4IXaBr8wQa__0RBwHcMc8pHc9py_6OcxP5dSHGPoduNfghmN6yNzz6EGo",
  },
];

export const heroImage =
  "https://lh3.googleusercontent.com/aida/ADBb0uiIbscgd3Rkj0AiW7GXl_LyiK_WAIqrH-zlq3Q4JMgfsa_26JSrkXPMvg_5RymxAIFUmKSUKr1SXmTRNLt7ahzOKRlmeqLRmp6EPQTYGGrUpppXdYnpVQi1uIbMT7wXTfqkoKjq6ix9S5ZgaJ3Ds4kHXib-Mga-99ocvNrFO_TeMXH0jvtWlGRNx4a7ivXutisL8wyTXxr5VLLUQSJ-f7tEhb9kd9uCuNMgVyOvnmN1WA-DNz15RlWw2tt7";
