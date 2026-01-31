/**
 * @fileoverview CacheManager - Camada de Cache em Memória
 * Utiliza o CacheService para acelerar a recuperação de dados estáticos e configurações.
 */

const CacheManager = {
  
  /**
   * Tenta recuperar um valor do cache ou executa a função se não existir
   * @param {string} key - Chave do cache
   * @param {number} expiration - Tempo em segundos (max 21600 = 6h)
   * @param {Function} fallbackFn - Função que busca o dado original
   */
  getOrFetch: function(key, expiration, fallbackFn) {
    const cache = CacheService.getScriptCache();
    const cached = cache.get(key);
    
    if (cached) {
       try {
         return JSON.parse(cached);
       } catch (e) {
         return cached;
       }
    }
    
    // Cache miss: Busca dado original
    const data = fallbackFn();
    cache.put(key, JSON.stringify(data), expiration);
    return data;
  },

  /**
   * Limpa uma chave específica
   */
  clear: function(key) {
    CacheService.getScriptCache().remove(key);
  }
};
