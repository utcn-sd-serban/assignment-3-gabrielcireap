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

    @GetMapping("questions/{id}")
    public List<AnswerDTO> findByQuestion(@PathVariable int id) {
        return answerManagementService.findByQuestion(id);
    }

    @PostMapping("/answers")
    public AnswerDTO addAnswer(@RequestBody AnswerDTO answerDTO){
        return answerManagementService.save(answerDTO.getQuestion().getId(), answerDTO.getText());
    }

    @PutMapping("/answers")
    public AnswerDTO editAnswer(@RequestBody AnswerDTO answerDTO){
        System.out.println(answerDTO);
        AnswerDTO dto =  answerManagementService.save(answerDTO);
        System.out.println(dto);
        return dto;
    }

    @DeleteMapping("/answers/{id}")
    public void deleteAnswer(@PathVariable int id){
        answerManagementService.remove(id);
    }
}
