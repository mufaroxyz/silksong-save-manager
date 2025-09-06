use ecb::cipher::{BlockDecryptMut, BlockEncryptMut, KeyInit};
use thiserror::Error;
use base64::Engine;

#[cfg(feature = "wasm")]
use web_sys;

type Aes256EcbDec = ecb::Decryptor<aes::Aes256>;

#[derive(Error, Debug)]
pub enum DecryptError {
    #[error("Invalid key length: expected 32 bytes, got {0}")]
    InvalidKeyLength(usize),
    #[error("Invalid data length: must be multiple of 16")]
    InvalidDataLength,
    #[error("Invalid input: {0}")]
    InvalidInput(String),
    #[error("Invalid format: {0}")]
    InvalidFormat(String),
    #[error("Decryption failed: {0}")]
    DecryptionFailed(String),
    #[error("Invalid padding")]
    InvalidPadding,
}

pub struct SaveDecryptor {
    key: [u8; 32],
}

// TeamCherry.SharedUtils.dll 0x0400001A 
pub const AES_KEY: &[u8; 32] = b"UKu52ePUBwetZ9wNX88o54dnfKRu0T1l";
pub const FILE_HEADER: &[u8] = &[0x00, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x06, 0x01, 0x00, 0x00, 0x00];

impl SaveDecryptor {
    pub fn new(key: &[u8]) -> Result<Self, DecryptError> {
        if key.len() != 32 {
            return Err(DecryptError::InvalidKeyLength(key.len()));
        }

        let mut key_array = [0u8; 32];
        key_array.copy_from_slice(key);

        Ok(SaveDecryptor { key: key_array })
    }

    pub fn with_default_key() -> Self {
        let default_key = AES_KEY;
        SaveDecryptor {
            key: *default_key,
        }
    }

    pub fn decrypt_data(&self, data: &[u8]) -> Result<Vec<u8>, DecryptError> {
        if data.is_empty() {
            return Ok(Vec::new());
        }

        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&format!("Decrypt data length: {} bytes", data.len()).into());

        self.decrypt_hollow_knight_format(data)
    }

    fn decrypt_raw_data(&self, data: &[u8]) -> Result<Vec<u8>, DecryptError> {
        let mut buffer = data.to_vec();
        
        if buffer.len() % 16 != 0 {
            let padding_needed = 16 - (buffer.len() % 16);
            buffer.extend(vec![0; padding_needed]);
            
            #[cfg(feature = "wasm")]
            web_sys::console::log_1(&format!("Padded {} bytes to align to 16-byte boundary", padding_needed).into());
        }

        let cipher = Aes256EcbDec::new(&self.key.into());

        Ok(cipher
            .decrypt_padded_mut::<ecb::cipher::block_padding::Pkcs7>(&mut buffer)
            .map_err(|e| {
                #[cfg(feature = "wasm")]
                web_sys::console::log_1(&format!("Decryption failed: {}", e).into());
                DecryptError::DecryptionFailed(e.to_string())
            })?
            .to_vec())
    }

    pub fn analyze_save_file(data: &[u8]) -> String {
        if data.is_empty() {
            return "Empty file".to_string();
        }

        let mut analysis = format!("File size: {} bytes\n", data.len());
        
        let preview_len = std::cmp::min(64, data.len());
        analysis.push_str(&format!("First {} bytes (hex): ", preview_len));
        for (i, &byte) in data[..preview_len].iter().enumerate() {
            if i > 0 && i % 16 == 0 {
                analysis.push('\n');
                analysis.push_str("                        ");
            }
            analysis.push_str(&format!("{:02x} ", byte));
        }
        analysis.push('\n');

        let entropy = Self::calculate_entropy(&data[..std::cmp::min(1024, data.len())]);
        analysis.push_str(&format!("Entropy (0-8, higher = more random): {:.2}\n", entropy));

        if data.len() >= 4 {
            let first_four = u32::from_le_bytes([data[0], data[1], data[2], data[3]]);
            analysis.push_str(&format!("First 4 bytes as LE u32: {} (0x{:08x})\n", first_four, first_four));
        }

        if data.len() >= FILE_HEADER.len() && data[..FILE_HEADER.len()] == FILE_HEADER[..] {
            analysis.push_str("✅ Matches known Hollow Knight C# header pattern!\n");

            let after_header = &data[FILE_HEADER.len()..];
            if after_header.len() > 0 {
                let remaining_len = after_header.len();
                if remaining_len > 1 {
                    let content = &after_header[..remaining_len - 1];
                    
                    analysis.push_str(&format!("Content after header: {} bytes\n", content.len()));
                    
                    analysis.push_str("First 32 bytes of content (hex): ");
                    for i in 0..std::cmp::min(32, content.len()) {
                        analysis.push_str(&format!("{:02x} ", content[i]));
                    }
                    analysis.push('\n');
                    
                    if content.iter().all(|&b| b.is_ascii() && (b.is_ascii_graphic() || b.is_ascii_whitespace())) {
                        analysis.push_str("Content appears to be ASCII text!\n");
                        
                        if let Ok(text_preview) = std::str::from_utf8(&content[..std::cmp::min(100, content.len())]) {
                            analysis.push_str(&format!("ASCII preview: {}\n", text_preview));
                        }
                    } else {
                        if let Ok(content_str) = std::str::from_utf8(content) {
                            analysis.push_str("Content is valid UTF-8 text\n");
                            
                            if content_str.chars().all(|c| c.is_ascii_alphanumeric() || c == '+' || c == '/' || c == '=') {
                                analysis.push_str(&format!("Content appears to be Base64 ({} bytes)\n", content.len()));
                                if content.len() <= 100 {
                                    analysis.push_str(&format!("Base64 content preview: {}\n", &content_str[..std::cmp::min(50, content_str.len())]));
                                }
                            } else {
                                analysis.push_str("UTF-8 content is not valid Base64\n");
                                analysis.push_str(&format!("Text preview: {}\n", &content_str[..std::cmp::min(100, content_str.len())]));
                            }
                        } else {
                            analysis.push_str("Content after header is not valid UTF-8\n");
                            
                            let entropy = Self::calculate_entropy(content);
                            analysis.push_str(&format!("Content entropy: {:.2} (if >7.0, likely encrypted)\n", entropy));
                            
                            if content.len() % 16 == 0 {
                                analysis.push_str("Content length is multiple of 16 (AES block aligned)\n");
                            } else {
                                analysis.push_str(&format!("Content length ({}) is not AES block aligned\n", content.len()));
                            }
                        }
                    }
                }
            }
        } else if data.starts_with(&[0x00, 0x01]) {
            analysis.push_str("Starts with 00 01\n");
        }

        let is_ascii = data.iter().take(100).all(|&b| b.is_ascii_graphic() || b.is_ascii_whitespace());
        analysis.push_str(&format!("Appears to be ASCII text: {}\n", is_ascii));

        analysis
    }

    fn calculate_entropy(data: &[u8]) -> f64 {
        if data.is_empty() {
            return 0.0;
        }

        let mut byte_counts = [0u32; 256];
        for &byte in data {
            byte_counts[byte as usize] += 1;
        }

        let len = data.len() as f64;
        let mut entropy = 0.0;

        for &count in &byte_counts {
            if count > 0 {
                let probability = count as f64 / len;
                entropy -= probability * probability.log2();
            }
        }

        entropy
    }

    pub fn decrypt_hollow_knight_format(&self, data: &[u8]) -> Result<Vec<u8>, DecryptError> {
        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&format!("Starting HK format decryption, input size: {}", data.len()).into());

        if data.len() < FILE_HEADER.len() {
            return Err(DecryptError::InvalidFormat("File too small to contain header".to_string()));
        }

        if &data[..FILE_HEADER.len()] != &FILE_HEADER[..] {
            #[cfg(feature = "wasm")]
            web_sys::console::log_1(&"Header doesn't match known pattern".into());
            
            return self.decrypt_raw_data(data);
        }

        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&"Header matches HK format".into());

        let after_header = &data[FILE_HEADER.len()..];

        if after_header.is_empty() {
            return Err(DecryptError::InvalidFormat("No data after header".to_string()));
        }

        let content = &after_header[..after_header.len() - 1];
        
        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&format!("Content after header removal: {} bytes", content.len()).into());

        if let Ok(content_str) = std::str::from_utf8(content) {
            #[cfg(feature = "wasm")]
            web_sys::console::log_1(&format!("Content is valid UTF-8, trying Base64 decode").into());
            
            if let Ok(base64_decoded) = base64::engine::general_purpose::STANDARD.decode(content_str) {
                #[cfg(feature = "wasm")]
                web_sys::console::log_1(&format!("Base64 decoded to {} bytes", base64_decoded.len()).into());
                
                return self.decrypt_raw_data(&base64_decoded);
            }
        }

        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&"Content is not UTF-8, checking for C# length encoding".into());

        if content.len() >= 4 {
            let mut offset = 0;
            let mut length = 0u32;
            let mut shift = 0;
            
            while offset < content.len() && offset < 5 {
                let byte = content[offset];
                length |= ((byte & 0x7F) as u32) << shift;
                offset += 1;
                shift += 7;
                
                if (byte & 0x80) == 0 {
                    break;
                }
            }
            
            #[cfg(feature = "wasm")]
            web_sys::console::log_1(&format!("Decoded length: {}, offset: {}", length, offset).into());
            
            if length > 0 && length < content.len() as u32 && offset < content.len() {
                let data_start = offset;
                let data_end = data_start + length as usize;
                
                if data_end <= content.len() {
                    let actual_data = &content[data_start..data_end];
                    
                    #[cfg(feature = "wasm")]
                    web_sys::console::log_1(&format!("Extracted data section: {} bytes", actual_data.len()).into());
                    
                    if let Ok(result) = self.decrypt_raw_data(actual_data) {
                        return Ok(result);
                    }
                    
                    if let Ok(data_str) = std::str::from_utf8(actual_data) {
                        if let Ok(base64_decoded) = base64::engine::general_purpose::STANDARD.decode(data_str) {
                            #[cfg(feature = "wasm")]
                            web_sys::console::log_1(&format!("Base64 decoded extracted data to {} bytes", base64_decoded.len()).into());
                            
                            return self.decrypt_raw_data(&base64_decoded);
                        }
                    }
                }
            }
        }

        #[cfg(feature = "wasm")]
        web_sys::console::log_1(&"Trying direct decryption of content".into());
        
        self.decrypt_raw_data(content)
    }

    pub fn decrypt_save_file(&self, encrypted_data: &[u8]) -> Result<Vec<u8>, DecryptError> {
        self.decrypt_data(encrypted_data)
    }

    pub fn decrypt_base64_string(&self, base64_string: &str) -> Result<String, DecryptError> {
        let encrypted_bytes = base64::engine::general_purpose::STANDARD
            .decode(base64_string)
            .map_err(|e| DecryptError::DecryptionFailed(format!("Base64 decode error: {}", e)))?;
        
        let decrypted_bytes = self.decrypt_raw_data(&encrypted_bytes)?;
        
        String::from_utf8(decrypted_bytes)
            .map_err(|e| DecryptError::DecryptionFailed(format!("UTF-8 decode error: {}", e)))
    }

    pub fn encrypt_string_to_base64(&self, plaintext: &str) -> Result<String, DecryptError> {
        let plaintext_bytes = plaintext.as_bytes();
        let encrypted_bytes = self.encrypt_data(plaintext_bytes)?;
        Ok(base64::engine::general_purpose::STANDARD.encode(encrypted_bytes))
    }

    pub fn encrypt_data(&self, data: &[u8]) -> Result<Vec<u8>, DecryptError> {
        if data.is_empty() {
            return Ok(Vec::new());
        }

        let cipher = ecb::Encryptor::<aes::Aes256>::new(&self.key.into());
        let mut buffer = data.to_vec();

        Ok(cipher
            .encrypt_padded_mut::<ecb::cipher::block_padding::Pkcs7>(&mut buffer, data.len())
            .map_err(|e| DecryptError::DecryptionFailed(e.to_string()))?
            .to_vec())
    }

    pub fn decrypt_stream<F>(&self, data: &[u8], chunk_size: usize, mut progress_callback: F) -> Result<Vec<u8>, DecryptError>
    where
        F: FnMut(f64),
    {
        if data.is_empty() {
            return Ok(Vec::new());
        }

        let mut result = Vec::new();
        
        let aligned_chunk_size = (chunk_size / 16) * 16;
        let actual_chunk_size = if aligned_chunk_size == 0 { 16 } else { aligned_chunk_size };
        
        let total_chunks = (data.len() + actual_chunk_size - 1) / actual_chunk_size;

        for (i, chunk) in data.chunks(actual_chunk_size).enumerate() {
            let mut buffer = chunk.to_vec();
            
            if buffer.len() % 16 != 0 {
                let padding_needed = 16 - (buffer.len() % 16);
                buffer.extend(vec![0; padding_needed]);
            }
            
            let is_last_chunk = i == total_chunks - 1;
            
            let cipher = Aes256EcbDec::new(&self.key.into());
            
            if is_last_chunk {
                let decrypted = cipher
                    .decrypt_padded_mut::<ecb::cipher::block_padding::Pkcs7>(&mut buffer)
                    .map_err(|e| DecryptError::DecryptionFailed(e.to_string()))?;
                result.extend_from_slice(decrypted);
            } else {
                cipher
                    .decrypt_padded_mut::<ecb::cipher::block_padding::NoPadding>(&mut buffer)
                    .map_err(|e| DecryptError::DecryptionFailed(e.to_string()))?;
                result.extend_from_slice(&buffer);
            }

            let progress = (i + 1) as f64 / total_chunks as f64;
            progress_callback(progress);
        }

        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_decryptor_creation() {
        let key = [0u8; 32];
        let decryptor = SaveDecryptor::new(&key).unwrap();
        assert_eq!(decryptor.key, key);
    }

    #[test]
    fn test_invalid_key_length() {
        let key = [0u8; 16]; // Wrong length
        let result = SaveDecryptor::new(&key);
        assert!(matches!(result, Err(DecryptError::InvalidKeyLength(16))));
    }

    #[test]
    fn test_default_key() {
        let decryptor = SaveDecryptor::with_default_key();
        assert_eq!(decryptor.key.len(), 32);
    }
}



