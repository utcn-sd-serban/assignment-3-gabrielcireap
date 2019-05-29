package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import com.gabrielcireap.stackOverflow.service.AnswerManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AnswersController {
    private final AnswerManagementService answerManagementService;
    
    @PostMapping("/answers")
    public AnswerDTO addAnswer(@RequestBody AnswerDTO answerDTO) {
        return answerManagementService.save(answerDTO.getQuestion().getId(), answerDTO.getText());
    }

    @PutMapping("/answers/{id}")
    public AnswerDTO editAnswer(@RequestBody AnswerDTO answerDTO) {
        return answerManagementService.save(answerDTO);
    }

    @DeleteMapping("/answers/{id}")
    public void deleteAnswer(@PathVariable int id) {
        answerManagementService.remove(id);
    }

    @GetMapping("/answers")
    public List<AnswerDTO> findAll(){
        return answerManagementService.findAll();
    }
}
