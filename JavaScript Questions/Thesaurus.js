class Thesaurus {
  constructor() {
    // 使用 Map 存储单词和它们的同义词集合
    this.synonymsMap = new Map();
  }

  addSynonym(word, synonym) {
    // 初始化 Map 中的词条
    if (!this.synonymsMap.has(word)) {
      this.synonymsMap.set(word, new Set());
    }
    if (!this.synonymsMap.has(synonym)) {
      this.synonymsMap.set(synonym, new Set());
    }

    // 添加双向同义关系
    this.synonymsMap.get(word).add(synonym);
    this.synonymsMap.get(synonym).add(word);
  }

  getSynonyms(word) {
    // 返回同义词集合，如果没有该词则返回空集合
    return this.synonymsMap.get(word) || new Set();
  }

  hasWord(word) {
    // 检查词典中是否包含该词
    return this.synonymsMap.has(word);
  }

  removeWord(word) {
    // 移除该词和它与其他词的关系
    if (this.synonymsMap.has(word)) {
      this.synonymsMap.get(word).forEach((synonym) => {
        this.synonymsMap.get(synonym).delete(word);
      });
      this.synonymsMap.delete(word);
    }
  }

  display() {
    // 显示所有词和它们的同义词，便于调试和验证
    this.synonymsMap.forEach((synonyms, word) => {
      console.log(`${word}: ${Array.from(synonyms).join(", ")}`);
    });
  }
}

// 测试示例
const thesaurus = new Thesaurus();
thesaurus.addSynonym("happy", "joyful");
thesaurus.addSynonym("happy", "content");
thesaurus.addSynonym("sad", "unhappy");

console.log("happy 同义词:", Array.from(thesaurus.getSynonyms("happy"))); // 输出 ["joyful", "content"]
console.log("sad 同义词:", Array.from(thesaurus.getSynonyms("sad"))); // 输出 ["unhappy"]
