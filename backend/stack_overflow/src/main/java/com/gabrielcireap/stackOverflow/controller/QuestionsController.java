package com.gabrielcireap.stackOverflow.controller;

import com.gabrielcireap.stackOverflow.dto.AnswerDTO;
import com.gabrielcireap.stackOverflow.dto.QuestionDTO;
import com.gabrielcireap.stackOverflow.service.QuestionManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class QuestionsController {

    private final QuestionManagementService questionManagementService;

    @GetMapping("/questions")
    public List<QuestionDTO> findAll() {
        return questionManagementService.listQuestions();
    }

    @PostMapping("/questions")
    public QuestionDTO save(@RequestBody QuestionDTO questionDTO) {
        return questionManagementService.save(questionDTO.getTitle(), questionDTO.getText(), questionDTO.getTags());
    }

    @GetMapping(value = "/questions/search", params = "title")
    public List<QuestionDTO> searchByTitle(@RequestParam("title") String title){
        return questionManagementService.findQuestionByTitle(title);
    }

    @GetMapping(value = "/questions/search", params = "tag")
    public List<QuestionDTO> searchByTag(@RequestParam("tag") String tag){
        System.out.println(tag);
        return questionManagementService.findQuestionByTag(tag);
    }
}
